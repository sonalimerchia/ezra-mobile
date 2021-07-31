import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Input,
  Illustration,
  Text,
  Pressable,
  Button,
} from '../Components';
import { useFirebaseAuth, useForm } from '../Hooks';
import { images } from '../Assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateEmail } from '../Utils';
import { useEffect } from 'react';
import { firebase } from '@react-native-firebase/firestore';

const ForgotPassword = () => {
  const { navigate, goBack } = useNavigation();
  const { values, useInput, errors } = useForm({});
  const [fetching, setFetching] = useState<boolean>(false);

  const onSubmit = async () => {
    if (values.email && validateEmail(values.email)) {
      setFetching(true);
      await firebase.auth().sendPasswordResetEmail(values.email);
      setFetching(false);
      goBack();
    }
  };

  return (
    <ImageBackground
      source={{ uri: images['login-background'] }}
      style={{ width: '100%', height: '100%' }}>
      <SafeAreaView>
        <Box height="100%" width="100%">
          <Box justifyContent="space-between" paddingHorizontal="small" row>
            <Illustration name="logo" width={50} height={50} />
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
          </Box>
          <Button onPress={onSubmit} loading={fetching}>
            Send Reset Link
          </Button>

          <Pressable
            style={{
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
              bottom: 0,
            }}
            onPress={() => goBack()}>
            <Text variant="body-1" color="blue-400">
              Return to Login
            </Text>
          </Pressable>
        </Box>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgotPassword;
