import React from 'react';
import Box from '../Box';
import Pressable from '../Pressable';
import icons from './assets';

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
  onPress?: () => void;
};

const Icon = ({ name, onPress }: IconProps) => {
  const icon = icons[name];

  return (
    <Pressable onPress={onPress}>
      <Box
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center">
        {icon}
      </Box>
    </Pressable>
  );
};

export default Icon;
