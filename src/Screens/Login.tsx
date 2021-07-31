import React from 'react';
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
import { validateEmail, validatePassword } from '../Utils';
import { useEffect } from 'react';

const Login = () => {
  const { userId, signIn, fetching } = useFirebaseAuth();
  const { navigate } = useNavigation();
  const { values, useInput, errors } = useForm({});

  const onSubmit = async () => {
    if (errors.length === 0) {
      await signIn(values.email, values.password);
    }
  };

  useEffect(() => {
    if (userId) {
      navigate('Loading', { next: 'AuthStack' });
    }
  }, [userId]);

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
            <Input
              placeholder="Password"
              textContentType="password"
              autoCapitalize="none"
              secureTextEntry={true}
              {...useInput('password', validatePassword)}
            />
          </Box>
          <Button onPress={onSubmit} loading={fetching}>
            Login
          </Button>

          <Pressable onPress={() => navigate('ForgotPassword')}>
            <Box width="90%" alignSelf="center" alignItems="flex-end">
              <Text variant="caption-1" color="blue-400" weight={300}>
                Forgot Password?
              </Text>
            </Box>
          </Pressable>
          <Pressable
            style={{
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
              bottom: 0,
            }}
            onPress={() => navigate('CreateAccount')}>
            <Text variant="body-1" color="blue-400">
              Create Account
            </Text>
          </Pressable>
        </Box>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
