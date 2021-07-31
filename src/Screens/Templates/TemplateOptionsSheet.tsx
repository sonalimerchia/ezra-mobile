import { useNavigation } from '@react-navigation/native';
import { Template } from 'common-types';
import React from 'react';
import { Alert } from 'react-native';
import { BottomSheet, Box, Button, Text } from '../../Components';
import { useTemplates } from '../../Hooks';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  template?: Template;
};

const TemplateBottomSheet = ({
  template,
  visible,
  onClose,
}: BottomSheetProps) => {
  const { navigate } = useNavigation();
  const { deleteTemplate } = useTemplates();

  const tryDelete = () => {
    if (!template) return;
    Alert.alert(
      'Delete Template',
      'Are you sure you would like to delete this template?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTemplate(template.id),
        },
      ],
    );

    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Box padding="base">
        <Text variant="body-1">{template?.name || ''}</Text>
        <Button
          onPress={() => {
            onClose();
            navigate('CreateTemplate', template);
          }}>
          Edit
        </Button>
        <Button
          onPress={() => {
            onClose();
            navigate('UseTemplate', template);
          }}>
          Use
        </Button>
        <Button onPress={() => tryDelete()}>Delete</Button>
      </Box>
    </BottomSheet>
  );
};

export default TemplateBottomSheet;
