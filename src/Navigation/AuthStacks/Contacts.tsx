import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Contacts, ViewContact } from '../../Screens';
import { ContactParamTypes } from '../StackParamList';
import { Header } from '../../Components';

const Stack = createStackNavigator<ContactParamTypes>();

const ContactsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ContactsHome"
      screenOptions={{
        header: props => <Header title="Contacts" {...props} />,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="ContactsHome" component={Contacts} />
      <Stack.Screen name="ViewContact" component={ViewContact} />
    </Stack.Navigator>
  );
};

export default ContactsStack;
