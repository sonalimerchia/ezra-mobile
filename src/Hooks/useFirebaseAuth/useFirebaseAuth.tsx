import React, { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import firebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react';

type AuthReturnType = {
  userId: string;
  accessToken: string;
};

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<AuthReturnType | null>;
  signOut: () => Promise<void>;
  userId?: string;
  accessToken?: string;
};

const asyncSignIn = async (
  email: string,
  password: string,
): Promise<AuthReturnType | null> => {
  try {
    const start = moment();
    const credential = await firebaseAuth().signInWithEmailAndPassword(
      email,
      password,
    );

    const { user } = credential;

    const token = await user.getIdToken();
    await AsyncStorage.setItem('firebase-userId', user.uid);
    await AsyncStorage.setItem(
      'firebase-credential',
      JSON.stringify(credential.user.toJSON()),
    );
    await AsyncStorage.setItem(
      'firebase-expireTime',
      start.add(1, 'hour').toString(),
    );

    return { userId: user.uid, accessToken: token };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const asyncSignOut = async () => {
  await AsyncStorage.removeItem('firebase-userId');
  await AsyncStorage.removeItem('firebase-credential');
  await AsyncStorage.removeItem('firebase-expireTime');
};

const getAccessToken = async (): Promise<AuthReturnType | null> => {
  const currentUser = firebaseAuth().currentUser;
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken();
      if (token) {
        return { accessToken: token, userId: currentUser.uid };
      }
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const file = await AsyncStorage.getItem('firebase-credential');
    const cred = JSON.parse(file || '') as FirebaseAuthTypes.User;
    const token = await cred.getIdToken();

    return { userId: cred.uid, accessToken: token };
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Context = createContext<AuthContextType>({
  signIn: asyncSignIn,
  signOut: asyncSignOut,
  accessToken: '',
});

export const Provider: React.FC = ({ children }) => {
  const context = useContext<AuthContextType>(Context);
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useFirebaseAuth = (): AuthContextType & { fetching: boolean } => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const context = useContext<AuthContextType>(Context);

  useEffect(() => {
    getAccessToken().then(value => {
      if (value) {
        setAccessToken(value.accessToken);
        context.accessToken = value.accessToken;

        setUserId(value.userId);
        context.userId = value.userId;
      }
      setFetching(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    setFetching(true);
    const value = await asyncSignIn(email, password);
    if (!value) return null;

    setAccessToken(value.accessToken);
    context.accessToken = value.accessToken;

    setUserId(value.userId);
    context.userId = value.userId;

    setFetching(false);
    return value;
  };

  const signOut = async () => {
    setFetching(true);
    context.accessToken = '';
    context.userId = '';

    setUserId('');
    setAccessToken('');
    await asyncSignOut();

    setFetching(false);
  };

  return {
    accessToken,
    userId,
    fetching,
    signIn,
    signOut,
  };
};

export default useFirebaseAuth;
