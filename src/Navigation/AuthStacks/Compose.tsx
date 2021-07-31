import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Compose, ScheduleJob, SelectContacts } from '../../Screens';
import { ComposeParamTypes } from '../StackParamList';
import { Header } from '../../Components';

const Stack = createStackNavigator<ComposeParamTypes>();

const ContactsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Compose"
      screenOptions={{
        header: props => <Header title="Compose" {...props} />,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Compose" component={Compose} />
      <Stack.Screen name="Schedule" component={ScheduleJob} />
      <Stack.Screen name="SelectContacts" component={SelectContacts} />
    </Stack.Navigator>
  );
};

export default ContactsStack;
