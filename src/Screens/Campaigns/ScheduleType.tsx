import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { CampaignParamTypes } from 'src/Navigation/StackParamList';
import { ArrowButton, Box, Icon, Pressable, Text } from '../../Components';

type RouteProps = RouteProp<CampaignParamTypes, 'ScheduleType'>;

const ScheduleType = () => {
  const { params } = useRoute<RouteProps>();
  const { navigate } = useNavigation();
  return (
    <Box height="100%" width="100%" alignItems="center">
      <Box height="30%" width="90%" alignSelf="center">
        <Pressable onPress={() => navigate('SchedulePeriodical', params)}>
          <Box alignItems="center" row>
            <Box flex={1} alignItems="flex-start">
              <Icon name="calendar" />
            </Box>
            <Box flex={2.5}>
              <Box marginBottom="tiny">
                <Text variant="title-2">Periodical Scheduling</Text>
              </Box>
              <Text variant="body-3">
                Set a repeating message to go out on a periodical basis. Set a
                date and repeat on a weekly, monthly, or yearly basis.
              </Text>
            </Box>
          </Box>
        </Pressable>
      </Box>
      <Box height="30%" width="90%" alignSelf="center">
        <Pressable onPress={() => navigate('SchedulePeriodical', params)}>
          <Box alignItems="center" row>
            <Box flex={1} alignItems="center">
              <Icon name="birthday" />
            </Box>
            <Box flex={2.5}>
              <Box marginBottom="tiny">
                <Text variant="title-2">Birthday Scheduling</Text>
              </Box>
              <Box>
                <Box marginBottom="tiny">
                  <Text variant="body-3">
                    Set out a message that will send on the birthday of the
                    contacts selected.
                  </Text>
                </Box>
                <Box>
                  <Text variant="body-3">
                    When this option is selected, it will only send out messages
                    to contacts who have birthdays listed in contacts
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Pressable>
      </Box>
    </Box>
  );
};

export default ScheduleType;
