import { useNavigation } from '@react-navigation/native';
import { Campaign } from 'common-types';
import React from 'react';
import { Alert } from 'react-native';
import { BottomSheet, Box, Button, Text } from '../../../Components';
import { useCampaigns } from '../../../Hooks';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  campaign?: Campaign;
};

const CampaignOptionsBottomSheet = ({
  campaign,
  visible,
  onClose,
}: BottomSheetProps) => {
  const { navigate } = useNavigation();
  const { deleteCampaign } = useCampaigns();

  const tryDelete = () => {
    if (!campaign) return;
    Alert.alert(
      'Delete Campaign',
      'Are you sure you would like to delete this campaign?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteCampaign(campaign.id),
        },
      ],
    );

    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Box padding="base">
        <Text variant="body-1">{campaign?.name || ''}</Text>
        <Button
          onPress={() => {
            onClose();
            navigate('EditCampaign', campaign);
          }}>
          Edit
        </Button>
        <Button onPress={() => tryDelete()}>Delete</Button>
      </Box>
    </BottomSheet>
  );
};

export default CampaignOptionsBottomSheet;
