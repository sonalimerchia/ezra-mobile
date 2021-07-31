/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Loading from '../Screens/Loading';
import { lightTheme } from '../Config';

import AuthStack from './AuthStack';
import { StackParamList } from './StackParamList';
import UnauthStack from './UnauthStack';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    background: lightTheme.backgroundColors['neutral-100'],
    primary: lightTheme.primaryColors['blue-400'],
    card: lightTheme.backgroundColors['neutral-100'],
    text: lightTheme.primaryColors['neutral-900'],
    notification: lightTheme.primaryColors['blue-400'],
    border: lightTheme.primaryColors['neutral-400'],
  },
};

const Navigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<StackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="UnauthStack">
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="UnauthStack" component={UnauthStack} />
    </Stack.Navigator>
  );
}

export default Navigation;
