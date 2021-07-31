import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ComposeParamTypes } from '../../Navigation/StackParamList';
import { Box, Text, Button } from '../../Components';
import { useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import { Switch } from 'react-native';
import { lightTheme } from '../../Config';
import { useCreateJob } from '../../Hooks';

type RouteProps = RouteProp<ComposeParamTypes, 'Schedule'>;

const ScheduleJob = ({ ...props }: any) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [hasExpiration, setExpiration] = useState<boolean>(false);
  const [{ data }, createJob] = useCreateJob();
  const { params } = useRoute<RouteProps>();
  const { navigate, goBack } = useNavigation();

  const start = Date.now();

  useEffect(() => {
    if (!params.contacts || !params.message || params.contacts.length < 0) {
      goBack();
    }
  }, [params.contacts, params.message]);

  useEffect(() => {
    if (data) {
      props.navigation.popToTop();
      navigate('Home');
    }
  }, [data]);

  const onSubmit = () => {
    const { contacts, message } = params;
    const data = {
      message,
      contacts,
      startTime: startDate.valueOf(),
      endTime: hasExpiration ? endDate.valueOf() : undefined,
    };
    if (!hasExpiration) delete data.endTime;
    try {
      createJob(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box backgroundColor="neutral-100" height="100%">
      <Box paddingHorizontal="small" paddingVertical="small">
        <Text variant="body-1">Start sending:</Text>
      </Box>

      <Box width="100%" alignItems="center">
        <DatePicker
          minimumDate={new Date(start)}
          date={startDate}
          onDateChange={setStartDate}
        />
      </Box>

      <Box
        paddingHorizontal="small"
        width="100%"
        justifyContent="space-between"
        row>
        <Text variant="body-1">Set cancel date?</Text>
        <Switch
          value={hasExpiration}
          onChange={() => setExpiration(o => !o)}
          trackColor={{ true: lightTheme.shapeFills['blue-400'] }}
        />
      </Box>

      {hasExpiration && (
        <>
          <Box paddingHorizontal="small" paddingVertical="small">
            <Text variant="body-1">Cancel date/time:</Text>
          </Box>
          <Box width="100%" alignItems="center">
            <DatePicker
              minimumDate={startDate}
              date={endDate}
              onDateChange={setEndDate}
            />
          </Box>
        </>
      )}
      <Box
        position="absolute"
        width="100%"
        bottom={0}
        alignItems="center"
        padding="base">
        <Button onPress={onSubmit}>Finish</Button>
      </Box>
    </Box>
  );
};

export default ScheduleJob;
