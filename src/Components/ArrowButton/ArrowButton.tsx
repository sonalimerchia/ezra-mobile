import React from 'react';
import Box from '../Box';
import Text from '../Text';
import Icon from '../Icon';
import Pressable from '../Pressable';

type ArrowProps = {
  onPress: () => void;
  disabled?: boolean;
  back?: boolean;
};

const ArrowButton = ({ onPress, back, disabled }: ArrowProps) => {
  return (
    <>
      {disabled ? undefined : (
        <Pressable onPress={onPress}>
          <Box row padding="large" alignItems="center">
            {back && (
              <Box paddingRight="tiny">
                <Icon name="back" />
              </Box>
            )}
            <Text variant="body-1" color="blue-400">
              {back ? 'Back' : 'Continue'}
            </Text>
            {!back && <Icon name="right-arrow" />}
          </Box>
        </Pressable>
      )}
    </>
  );
};

export default ArrowButton;
