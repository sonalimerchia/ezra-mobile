import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { AuthStackParamList } from 'src/Navigation/StackParamList';
import { Box, Pressable, Text } from '../../../Components';

type CardProps = {
  title: string;
  route: keyof AuthStackParamList;
};

const Card = ({ title, route }: CardProps) => {
  const { navigate } = useNavigation();

  return (
    <Pressable onPress={() => navigate(route)}>
      <Box
        width="90%"
        alignSelf="center"
        alignItems="center"
        height={50}
        justifyContent="center"
        marginVertical="tiny"
        shapeFill="blue-200">
        <Text variant="body-1" color="neutral-900">
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Card;
