import React, { useState } from 'react';
import { Contact } from 'common-types';
import {
  BottomSheet,
  Box,
  Pressable,
  TagButton,
  Text,
} from '../../../Components';
import { useContacts, useUserData } from '../../../Hooks';
import { Alert } from 'react-native';
import { useEffect } from 'react';

type CategoriesBottomSheetProps = {
  contact: Contact;
  visible: boolean;
  onClose: () => void;
};

const CategoriesBottomSheet = ({
  contact,
  visible,
  onClose,
}: CategoriesBottomSheetProps) => {
  const { user, updateUser } = useUserData();
  const [categories, setCategories] = useState<string[]>(contact.categories);
  const { updateContact } = useContacts();

  const onPress = (o: string) => {
    if (categories.includes(o)) {
      setCategories(categories.filter(option => option !== o));
    } else {
      const addArr = categories.concat([o]);
      setCategories(addArr);
    }
  };

  const onSubmit = () => {
    if (!user) return;
    updateContact(contact.id, { categories });
  };

  const addCategory = () => {
    Alert.prompt(
      'Add category',
      'Give your category a unique name',
      (text: string) => {
        if (!user) return;
        const arr = user?.categories.concat([text]);
        const contactArr = categories.concat([text]);

        updateUser({ categories: arr });
        setCategories(contactArr);
      },
    );
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={() => {
        onSubmit();
        onClose();
      }}
      data={user?.categories}
      keyExtractor={(item: string) => item}
      header={
        <Box padding="base">
          <Box row width="100%">
            <TagButton
              label="Add category"
              iconName="plus"
              onPress={addCategory}
            />
          </Box>
        </Box>
      }
      renderItem={({ item }: any) => (
        <Pressable onPress={() => onPress(item)} key={item}>
          <Box
            justifyContent="space-between"
            row
            paddingHorizontal="tiny"
            paddingVertical="tiny">
            <Box>
              <Text variant="body-1">{item}</Text>
            </Box>
            <Box
              borderColor="primary"
              borderRadius="round"
              borderWidth="large"
              shapeFill={categories.includes(item) ? 'blue-400' : undefined}
              height={30}
              width={30}
            />
          </Box>
        </Pressable>
      )}></BottomSheet>
  );
};
export default CategoriesBottomSheet;
