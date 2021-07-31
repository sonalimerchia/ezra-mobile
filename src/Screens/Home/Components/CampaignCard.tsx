import { useNavigation } from '@react-navigation/native';
import { Campaign, SimpleContact } from 'common-types';
import React from 'react';
import { Box, Pressable, Text } from '../../../Components';
import moment from 'moment';
import { formatNumber } from '../../../Screens/Contacts/contacts.utils';

type CardProps = {
  campaign: Campaign;
};

const makeList = (contacts: SimpleContact[]) => {
  return contacts
    .map(c => `${c.name} @ ${formatNumber(c.phoneNumber)}`)
    .join(', ');
};

const CampaignCard = ({ campaign }: CardProps) => {
  const { navigate } = useNavigation();

  return (
    <Pressable onPress={() => navigate('ViewJob', campaign)}>
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
            {campaign.message}
          </Text>
          <Text variant="caption-1" color="neutral-900" numberOfLines={1}>
            {makeList(campaign.contacts)}
          </Text>
        </Box>
        {campaign.repeatType === 'periodical' && (
          <Box alignItems="flex-end">
            <Text variant="caption-1" color="neutral-900">
              {`Start on ${moment(campaign.startTime).format('M/D/YY')}`}
            </Text>
            {campaign.endTime && (
              <Text variant="caption-1" color="neutral-900">
                {`End on ${moment(campaign.endTime).format('M/D/YY')}`}
              </Text>
            )}
          </Box>
        )}
      </Box>
    </Pressable>
  );
};

export default CampaignCard;
