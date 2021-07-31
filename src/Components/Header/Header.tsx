import React from 'react';
import Box from '../Box';
import Text from '../Text';
import { StatusBar } from 'react-native';
import Illustration from '../Illustration';
import Pressable from '../Pressable';

const Header = ({ title, ...props }: any) => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Box
        backgroundColor="neutral-100"
        marginTop="base"
        alignItems="center"
        paddingHorizontal="base"
        justifyContent="space-between"
        height={90}
        row>
        <Pressable onPress={() => props.navigation.toggleDrawer()}>
          <Illustration name="logo" width={50} height={50} />
        </Pressable>
        <Box justifyContent="center" height="100%">
          <Text variant="title-2">{title}</Text>
        </Box>
      </Box>
    </>
  );
};

export default Header;
