import React from 'react';
import Box from '../Box';
import Pressable from '../Pressable';
import Text from '../Text';

export type TextButtonProps = {
  text: string;
  disabled?: boolean;
  onPress: () => void;
};

const TextButton = ({ text, disabled = false, onPress }: TextButtonProps) => {
  return (
    <Pressable
      onPress={() => {
        if (!disabled) onPress();
      }}>
      <Box
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center">
        <Text variant="body-2" color={disabled ? 'neutral-900' : 'green-600'}>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default TextButton;
