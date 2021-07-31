import React from 'react';
import { Contact } from 'common-types';
import { BottomSheet, Box, Pressable, Text } from '../../../Components';
import { flatten } from 'lodash';

type FilterBottomSheetProps = {
  contacts: Contact[];
  visible: boolean;
  selectedCategory?: string;
  onClose: (category?: string) => void;
};

const FilterBottomSheet = ({
  contacts,
  visible,
  selectedCategory,
  onClose,
}: FilterBottomSheetProps) => {
  const categorieGroups = flatten(contacts.map(c => c.categories));

  const categories = categorieGroups.filter(
    (c, i) => categorieGroups.indexOf(c) === i,
  );

  const onPress = (o: string) => {
    onClose(o);
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={() => {
        onClose();
      }}
      data={categories}
      keyExtractor={(item: string) => item}
      renderItem={({ item }: any) => (
        <Pressable
          onPress={() => onPress(item)}
          key={item}
          style={{ height: 50, position: 'relative' }}>
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
              shapeFill={selectedCategory === item ? 'blue-400' : undefined}
              height={30}
              width={30}
            />
          </Box>
        </Pressable>
      )}
    />
  );
};
export default FilterBottomSheet;
