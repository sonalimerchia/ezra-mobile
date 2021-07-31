import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Campaigns,
  EditCampaign,
  SchedulePeriodical,
  ScheduleType,
  SelectContacts,
} from '../../Screens';
import { CampaignParamTypes } from '../StackParamList';
import { Header } from '../../Components';

const Stack = createStackNavigator<CampaignParamTypes>();

const ContactsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Campaigns"
      screenOptions={{
        header: props => <Header title="Campaigns" {...props} />,
      }}>
      <Stack.Screen name="Campaigns" component={Campaigns} />
      <Stack.Screen name="EditCampaign" component={EditCampaign} />
      <Stack.Screen name="ScheduleType" component={ScheduleType} />
      <Stack.Screen name="SchedulePeriodical" component={SchedulePeriodical} />
      <Stack.Screen name="SelectContacts" component={SelectContacts} />
    </Stack.Navigator>
  );
};

export default ContactsStack;
