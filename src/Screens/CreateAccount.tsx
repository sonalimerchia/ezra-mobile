import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  Illustration,
  Input,
  Pressable,
  Text,
} from '../Components';
import { images } from '../Assets';
import { useFirebaseAuth, useForm } from '../Hooks';
import { useNavigation } from '@react-navigation/native';
import firebaseAuth from '@react-native-firebase/auth';
import { validateEmail, validatePassword } from '../Utils';

const CreateAccount = () => {
  const auth = firebaseAuth();
  const { signIn } = useFirebaseAuth();
  const { navigate, goBack } = useNavigation();
  const [fetching, setFetching] = useState<boolean>();
  const { values, errors, useInput } = useForm({});

  const onSubmit = async () => {
    if (errors.length === 0) {
      try {
        setFetching(true);
        await auth.createUserWithEmailAndPassword(
          values.email,
          values.password,
        );
        await signIn(values.email, values.password);
        navigate('Loading', { next: 'AuthStack' });
      } catch (error) {
        console.log(error);
      }
      setFetching(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: images['login-background'] }}
      style={{ width: '100%', height: '100%' }}>
      <SafeAreaView>
        <Box height="100%" width="100%">
          <Box justifyContent="space-between" paddingHorizontal="small" row>
            <Pressable onPress={() => goBack()}>
              <Illustration name="logo" width={50} height={50} />
            </Pressable>
            <Text variant="title-1">EZRA</Text>
          </Box>
          <Box
            width="90%"
            alignSelf="center"
            marginTop="xxLarge"
            marginBottom="tiny">
            <Box marginVertical="small">
              <Input
                placeholder="Email"
                textContentType="emailAddress"
                autoCapitalize="none"
                {...useInput('email', validateEmail)}
              />
            </Box>
            <Input
              placeholder="Password"
              textContentType="password"
              autoCapitalize="none"
              secureTextEntry={true}
              {...useInput('password', validatePassword)}
            />
            <Box marginVertical="small">
              <Input
                placeholder="Confirm Password"
                textContentType="password"
                autoCapitalize="none"
                secureTextEntry={true}
                {...useInput(
                  'confirmPassword',
                  (value: string) => values.password === value,
                )}
              />
            </Box>
          </Box>
          <Button onPress={onSubmit} loading={fetching}>
            Sign Up
          </Button>
        </Box>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CreateAccount;
