import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, ViewJob } from '../../Screens';
import { HomeParamTypes } from '../StackParamList';
import { Header } from '../../Components';

const Stack = createStackNavigator<HomeParamTypes>();

const ContactsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <Header title="EZRA" {...props} />,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewJob" component={ViewJob} />
    </Stack.Navigator>
  );
};

export default ContactsStack;
