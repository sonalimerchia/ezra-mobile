import React from 'react';
import { AuthStackParamList } from './StackParamList';
import {
  TemplatesStack,
  ComposeStack,
  CampaignStack,
  ContactsStack,
  HomeStack,
} from './AuthStacks';
import Contacts from 'react-native-contacts';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect } from 'react';
import { useContacts } from '../Hooks';

const Drawer = createDrawerNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Templates" component={TemplatesStack} />
      <Drawer.Screen name="Compose" component={ComposeStack} />
      {/* <Drawer.Screen name="Campaigns" component={CampaignStack} /> */}
      <Drawer.Screen name="Contacts" component={ContactsStack} />
    </Drawer.Navigator>
  );
};

export default AuthStack;
