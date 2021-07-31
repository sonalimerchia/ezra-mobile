import React from 'react';
import Box from '../Box';
import Pressable from '../Pressable';
import Text from '../Text';
import { ActivityIndicator } from 'react-native';

type ButtonProps = {
  children: string;
  onPress: () => void;
  loading?: boolean;
};

const Button = ({ children, loading = false, onPress }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={{ width: '100%' }}>
      <Box
        width="90%"
        padding="small"
        margin="tiny"
        borderRadius="base"
        alignSelf="center"
        alignItems="center"
        shapeFill="blue-400">
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text variant="body-1" color="neutral-100">
            {children}
          </Text>
        )}
      </Box>
    </Pressable>
  );
};

export default Button;
