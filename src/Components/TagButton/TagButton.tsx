import React from 'react';
import Box from '../Box';
import Icon, { IconName } from '../Icon';
import Pressable from '../Pressable';
import Text from '../Text';

type TagButtonProps = {
  label: string;
  iconName?: IconName;
  onPress: () => void;
};

const TagButton = ({ label, iconName, onPress }: TagButtonProps) => {
  return (
    <Box maxHeight={40} marginRight="tiny">
      <Pressable onPress={onPress}>
        <Box
          shapeFill="blue-200"
          paddingVertical="tiny"
          paddingHorizontal="small"
          borderRadius="round"
          row
          alignItems="center">
          <Box>{iconName && <Icon name={iconName} />}</Box>
          <Text variant="body-2" color="blue-400">
            {label}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default TagButton;
