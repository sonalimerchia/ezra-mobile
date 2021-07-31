import React from 'react';
import { Pressable as NativePressable } from 'react-native';
import Box, { BoxProps } from '../Box';

type PressableProps = {
  children: React.ReactNode;
  hitSlop?: number;
  onPress?: () => void;
  style?: BoxProps;
};

const Pressable = ({ children, onPress, style }: PressableProps) => {
  return (
    <Box {...style}>
      <NativePressable onPress={onPress}>{children}</NativePressable>
    </Box>
  );
};

export default Pressable;
