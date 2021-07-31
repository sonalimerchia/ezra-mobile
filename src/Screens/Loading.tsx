import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Illustration, Text } from '../Components';
import { StackParamList } from '../Navigation/StackParamList';

type RouteProps = RouteProp<StackParamList, 'Loading'>;

const Loading: React.FC = () => {
  const { navigate } = useNavigation();
  const route = useRoute<RouteProps>();
  const { next } = route.params;

  useEffect(() => {
    navigate(next);
  }, [next]);

  return (
    <SafeAreaView>
      <Box
        alignItems="center"
        width="100%"
        height="80%"
        alignSelf="center"
        justifyContent="center">
        <Box alignItems="center" justifyContent="center" row>
          <Illustration
            name="logo"
            width={50}
            height={50}
            marginRight="small"
          />
          <Text variant="title-1">EZRA</Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Loading;
