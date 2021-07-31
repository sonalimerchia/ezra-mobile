import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { CampaignParamTypes } from '../../Navigation/StackParamList';
import { Box, Text, Pressable, Button, BottomSheet } from '../../Components';
import { useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import { Switch } from 'react-native';
import { lightTheme } from '../../Config';
import { useCampaigns } from '../../Hooks';

type RouteProps = RouteProp<CampaignParamTypes, 'SchedulePeriodical'>;

const SchedulePeriodical = ({ ...props }: any) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [hasExpiration, setExpiration] = useState<boolean>(false);
  const [bottomSheetOpen, setRepeatBottomSheetOpen] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<'Weekly' | 'Monthly' | 'Yearly'>(
    'Monthly',
  );
  const { createCampaign, updateCampaign } = useCampaigns();
  const { params } = useRoute<RouteProps>();
  const { navigate, goBack } = useNavigation();

  const start = Date.now();

  const onSubmit = () => {
    const data: any = {
      ...params,
      repeatType: 'periodical',
      frequency: frequency.toLocaleLowerCase(),
      startTime: startDate.valueOf(),
      endTime: hasExpiration ? endDate.valueOf() : undefined,
    };
    if (!hasExpiration) delete data.endTime;

    if ((params as any).id) {
      updateCampaign((params as any).id, data);
      props.navigation.popToTop();
      navigate('Campaigns');
    } else {
      try {
        createCampaign(data as any);
        props.navigation.popToTop();
        navigate('Campaigns');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <BottomSheet
        visible={bottomSheetOpen}
        onClose={() => setRepeatBottomSheetOpen(false)}
        data={['Weekly', 'Monthly', 'Yearly']}
        keyExtractor={(item: string) => item}
        header={
          <Box marginBottom="small">
            <Text variant="body-1" color="neutral-600">
              REPEAT TYPES
            </Text>
          </Box>
        }
        renderItem={({ item }: any) => (
          <Pressable
            onPress={() => {
              setFrequency(item);
              setRepeatBottomSheetOpen(false);
            }}
            key={item}>
            <Box
              justifyContent="space-between"
              row
              paddingHorizontal="tiny"
              paddingVertical="tiny">
              <Box>
                <Text variant="body-1">{item}</Text>
              </Box>
              <Box
                borderColor="primary"
                borderRadius="round"
                borderWidth="large"
                shapeFill={frequency === item ? 'blue-400' : undefined}
                height={30}
                width={30}
              />
            </Box>
          </Pressable>
        )}
      />

      <Box backgroundColor="neutral-100" height="100%">
        <Box width="90%" alignSelf="center" justifyContent="space-between" row>
          <Text variant="body-1">Repeat:</Text>
          <Pressable onPress={() => setRepeatBottomSheetOpen(true)}>
            <Text variant="body-1" color="neutral-600">
              {frequency}
            </Text>
          </Pressable>
        </Box>
        <Box paddingHorizontal="small" paddingVertical="small">
          <Text variant="body-1">Start date:</Text>
        </Box>

        <Box width="100%" alignItems="center">
          <DatePicker
            minimumDate={new Date(start)}
            date={startDate}
            onDateChange={setStartDate}
            mode="date"
          />
        </Box>

        <Box
          paddingHorizontal="small"
          width="100%"
          justifyContent="space-between"
          row>
          <Text variant="body-1">Set end repeat date?</Text>
          <Switch
            value={hasExpiration}
            onChange={() => setExpiration(o => !o)}
            trackColor={{ true: lightTheme.shapeFills['blue-400'] }}
          />
        </Box>

        {hasExpiration && (
          <>
            <Box paddingHorizontal="small" paddingVertical="small">
              <Text variant="body-1">End date:</Text>
            </Box>
            <Box width="100%" alignItems="center">
              <DatePicker
                minimumDate={startDate}
                date={endDate}
                onDateChange={setEndDate}
                mode="date"
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
    </>
  );
};

export default SchedulePeriodical;
