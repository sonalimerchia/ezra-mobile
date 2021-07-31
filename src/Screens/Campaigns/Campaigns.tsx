import React, { useState } from 'react';
import {
  Box,
  Header,
  ListItem,
  ScrollContainer,
  TagButton,
} from '../../Components';
import { useNavigation } from '@react-navigation/native';
import { Campaign } from 'common-types';
import useCampaigns from '../../Hooks/useCampaigns';
import { FlatList } from 'react-native';
import { CampaignOptionsSheet } from './BottomSheets';

const parse = (text: string) => {
  if (text.includes('\n')) return `${text.split('\n')[0]}...`;
  return text;
};

const Templates = () => {
  const [focusedCampaign, setFocusedCampaign] = useState<Campaign>();
  const { navigate } = useNavigation();
  const { campaigns } = useCampaigns();

  return (
    <>
      <CampaignOptionsSheet
        visible={!!focusedCampaign}
        onClose={() => setFocusedCampaign(undefined)}
        campaign={focusedCampaign}
      />
      <Box height="100%" backgroundColor="neutral-100">
        <Box
          backgroundColor="neutral-100"
          width="100%"
          paddingVertical="tiny"
          paddingHorizontal="small"
          alignItems="flex-end"
          alignSelf="center">
          <TagButton
            label="Create New"
            onPress={() => navigate('EditCampaign')}
          />
        </Box>
        <FlatList
          data={campaigns}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              title={item.name}
              description={parse(item.message)}
              onPress={() => setFocusedCampaign(item)}
            />
          )}
        />
      </Box>
    </>
  );
};

export default Templates;
