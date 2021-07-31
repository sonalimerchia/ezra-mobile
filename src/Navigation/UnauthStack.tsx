import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, CreateAccount, ForgotPassword } from '../Screens';
import { UnauthStackParamList } from './StackParamList';

const Stack = createStackNavigator<UnauthStackParamList>();

const UnauthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="CreateAccount" component={CreateAccount} />
  </Stack.Navigator>
);

export default UnauthStack;
