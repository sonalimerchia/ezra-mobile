import React from 'react';
import Box from '../Box';
import Icon from '../Icon';
import Pressable from '../Pressable';
import Text from '../Text';

type ListItemProps = {
  title: string;
  onPress: () => void;
  description: string;
};

const ListItem = ({ title, description, onPress }: ListItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        alignSelf="center"
        width="90%"
        borderBottomWidth="small"
        borderColor="secondary"
        paddingVertical="small"
        marginHorizontal="tiny">
        <Box flex={1} justifyContent="space-between" row>
          <Text variant="title-2">{title}</Text>
          <Icon name="three-dots" onPress={() => onPress()} />
        </Box>

        <Box paddingTop="tiny">
          <Text variant="body-2" color="neutral-700" numberOfLines={1}>
            {description}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default ListItem;
