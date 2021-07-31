import { useNavigation } from '@react-navigation/native';
import { Job, SimpleContact } from 'common-types';
import React from 'react';
import { Box, Pressable, Text } from '../../../Components';
import moment from 'moment';
import { formatNumber } from '../../../Screens/Contacts/contacts.utils';

type CardProps = {
  job: Job;
};

const makeList = (contacts: SimpleContact[]) => {
  return contacts
    .map(c => `${c.name} @ ${formatNumber(c.phoneNumber)}`)
    .join(', ');
};

const JobCard = ({ job }: CardProps) => {
  const { navigate } = useNavigation();

  return (
    <Pressable onPress={() => navigate('ViewJob', job)}>
      <Box
        width="90%"
        alignSelf="center"
        padding="tiny"
        height={50}
        justifyContent="space-between"
        marginVertical="tiny"
        shapeFill="blue-200"
        row>
        <Box maxWidth="60%">
          <Text variant="caption-1" color="neutral-900" numberOfLines={1}>
            {job.message}
          </Text>
          <Text variant="caption-1" color="neutral-900" numberOfLines={1}>
            {makeList(job.contacts)}
          </Text>
        </Box>
        <Box alignItems="flex-end">
          <Text variant="caption-1" color="neutral-900">
            {`Sen${(job as any).complete ? 't' : 'd'} on ${moment(
              job.startTime,
            ).format('M/D/YY')}`}
          </Text>
          {job.endTime && (
            <Text variant="caption-1" color="neutral-900">
              {`End on ${moment(job.endTime).format('M/D/YY')}`}
            </Text>
          )}
        </Box>
      </Box>
    </Pressable>
  );
};

export default JobCard;
