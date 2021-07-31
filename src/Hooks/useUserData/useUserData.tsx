import { useState, useEffect } from 'react';
import useFirebaseAuth from '../useFirebaseAuth';
import { User } from 'common-types';
import firebaseStore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

type RefType =
  FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;

type HookReturnType = {
  user?: User;
  fetching: boolean;
  updateUser: (updates: Partial<User>) => Promise<void>;
};

const useTemplates = (): HookReturnType => {
  const { userId } = useFirebaseAuth();
  const [fetching, setFetching] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  let userRef: RefType = firebaseStore()
    .collection('users')
    .doc(userId)
    .collection('profile')
    .doc('userData');

  const listener = () => {
    if (userRef) {
      try {
        userRef.onSnapshot(snapshot => {
          if (!snapshot) return;

          try {
            const doc = snapshot.data() as User;
            if (!doc) return;
            setUser(doc);
            setFetching(false);
          } catch (error) {
            console.log('error in listenToQuery inside:', error);
          }
        });
      } catch (error) {
        console.log('error setting up listener');
      }
    }
  };

  const createUser = async () => {
    const doc = await userRef.get();
    try {
      if (!doc.exists) {
        await userRef.set({ categories: [] });
      }
    } catch (error) {
      console.log('creating user error');
    }
  };

  useEffect(() => {
    if (userId) {
      try {
        userRef = firebaseStore()
          .collection('users')
          .doc(userId)
          .collection('profile')
          .doc('userData');

        createUser().then(() => listener());
      } catch (error) {
        console.log(error);
      }
    }
  }, [userId]);

  const updateUser = async (updates: Partial<User>) => {
    if (userRef) {
      try {
        const response = await userRef.update(updates);
        console.log('response', response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    user,
    fetching,
    updateUser,
  };
};

export default useTemplates;
