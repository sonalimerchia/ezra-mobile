import React from 'react';
import images from './images';
import Box, { BoxProps } from '../Box';

export type IllustrationNames = keyof typeof images;

type IllustrationProps = {
  name: IllustrationNames;
} & BoxProps;

const Illustration = ({ name, ...boxProps }: IllustrationProps) => {
  const SVG = images[name];

  return (
    <Box center alignItems="center" justifyContent="center" {...boxProps}>
      {SVG}
    </Box>
  );
};

export default Illustration;
