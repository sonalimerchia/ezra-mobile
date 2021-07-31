import React from 'react';
import { HomeParamTypes } from '../../Navigation/StackParamList';
import { Box, Button, ScrollContainer, Text } from '../../Components';
import { RouteProp, useRoute } from '@react-navigation/core';
import { formatNumber } from '../Contacts/contacts.utils';
import { useJobs } from '../../Hooks';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type RouteProps = RouteProp<HomeParamTypes, 'ViewJob'>;

const ViewJob = () => {
  const { deleteJob } = useJobs();
  const { goBack } = useNavigation();
  const { params: job } = useRoute<RouteProps>();

  const tryDelete = () => {
    Alert.alert(
      'Delete Job',
      'Are you sure you would like to delete this Job?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteJob(job.id);
            goBack();
          },
        },
      ],
    );
  };

  return (
    <>
      <ScrollContainer scroll>
        <Box width="90%" alignSelf="center">
          <Box
            width="100%"
            justifyContent="space-between"
            marginBottom="tiny"
            row>
            <Box flex={1} alignItems="flex-start">
              <Text variant="body-1" color="blue-400">
                Message
              </Text>
            </Box>
          </Box>
          <Box marginBottom="base">
            <Text variant="body-1" color="neutral-600">
              {job.message}
            </Text>
          </Box>
          <Box marginBottom="tiny">
            <Text variant="body-1" color="blue-400">
              Contacts:
            </Text>
          </Box>
          {job.contacts.map(c => (
            <Box
              width="100%"
              justifyContent="space-between"
              row
              key={c.phoneNumber}>
              <Box flex={1} alignItems="flex-start">
                <Text variant="body-1">{c.name}</Text>
              </Box>
              <Box flex={1} alignItems="flex-end">
                <Text variant="body-1" color="neutral-600">
                  {formatNumber(c.phoneNumber)}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </ScrollContainer>
      <Box position="absolute" width="100%" bottom={0} marginBottom="base">
        {!(job as any).complete && (
          <Button onPress={tryDelete}>Cancel Job</Button>
        )}
        <Button onPress={goBack}>Back</Button>
      </Box>
    </>
  );
};
export default ViewJob;
