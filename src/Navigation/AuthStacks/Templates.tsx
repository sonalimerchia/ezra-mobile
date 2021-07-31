import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CreateTemplate,
  ScheduleJob,
  SelectContacts,
  Templates,
  UseTemplate,
} from '../../Screens';
import { TemplateParamTypes } from '../StackParamList';
import { Header } from '../../Components';

const Stack = createStackNavigator<TemplateParamTypes>();

const TemplatesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Templates"
      screenOptions={{
        header: props => <Header title="Templates" {...props} />,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Templates" component={Templates} />
      <Stack.Screen name="CreateTemplate" component={CreateTemplate} />
      <Stack.Screen name="UseTemplate" component={UseTemplate} />
      <Stack.Screen name="SelectContacts" component={SelectContacts} />
      <Stack.Screen name="Schedule" component={ScheduleJob} />
    </Stack.Navigator>
  );
};

export default TemplatesStack;
