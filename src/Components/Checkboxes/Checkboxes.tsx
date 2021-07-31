import React from 'react';
import Box from '../Box';
import Text from '../Text';
import Pressable from '../Pressable';
import { FlatList } from 'react-native';

export type CheckboxOptionProps = {
  name: string;
  subtitle?: string;
  value: string;
  selected?: boolean;
};

export type CheckboxProps = {
  options: CheckboxOptionProps[];
  onPressOption: (o: CheckboxOptionProps) => void;
};

const Checkboxes = ({ options, onPressOption }: CheckboxProps) => {
  return (
    <FlatList
      data={options}
      style={{ height: '100%', width: '90%', alignSelf: 'center' }}
      keyExtractor={item => item.value}
      renderItem={({ item }) => {
        const { value, name, subtitle, selected } = item;
        return (
          <Pressable onPress={() => onPressOption(item)} key={value}>
            <Box
              justifyContent="space-between"
              row
              paddingHorizontal="tiny"
              paddingVertical="tiny">
              <Box>
                <Text variant="body-1">{name}</Text>
                {subtitle && (
                  <Text variant="caption-1" color="neutral-700">
                    {subtitle}
                  </Text>
                )}
              </Box>
              <Box
                borderColor="primary"
                borderRadius="round"
                borderWidth="large"
                shapeFill={selected ? 'blue-400' : undefined}
                height={30}
                width={30}
              />
            </Box>
          </Pressable>
        );
      }}
    />
  );
};

export default Checkboxes;
