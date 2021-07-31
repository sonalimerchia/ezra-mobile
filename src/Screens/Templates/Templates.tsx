import React, { useState } from 'react';
import { useTemplates } from '../../Hooks';
import { Box, ListItem, TagButton } from '../../Components';
import { useNavigation } from '@react-navigation/native';
import TemplateBottomSheet from './TemplateOptionsSheet';
import { Template } from 'common-types';
import { FlatList } from 'react-native';

const parse = (text: string) => {
  if (text.includes('\n')) return `${text.split('\n')[0]}...`;
  return text;
};

const Templates = () => {
  const [focusedTemplate, setFocusedTemplate] = useState<Template>();
  const { templates } = useTemplates();
  const { navigate } = useNavigation();

  return (
    <>
      <TemplateBottomSheet
        template={focusedTemplate}
        onClose={() => setFocusedTemplate(undefined)}
        visible={!!focusedTemplate}
      />
      <Box
        backgroundColor="neutral-100"
        width="100%"
        paddingVertical="tiny"
        paddingHorizontal="small"
        alignItems="flex-end"
        alignSelf="center">
        <TagButton
          label="Create New"
          onPress={() => navigate('CreateTemplate')}
        />
      </Box>
      <FlatList
        data={templates}
        style={{ backgroundColor: '#FFFFFF' }}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            title={item.name}
            description={parse(item.message)}
            onPress={() => setFocusedTemplate(item)}
          />
        )}
      />
    </>
  );
};

export default Templates;
