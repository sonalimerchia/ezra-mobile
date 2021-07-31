import React from 'react';
import { useForm } from '../../Hooks';
import { ArrowButton, Box, Button, Input, Text } from '../../Components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CampaignParamTypes } from '../../Navigation/StackParamList';

type RouteProps = RouteProp<CampaignParamTypes, 'EditCampaign'>;

const EditCampaign = () => {
  const { params } = useRoute<RouteProps>();
  const { values, useInput, setValue } = useForm(params || {});
  const { navigate } = useNavigation();

  const addName = () => {
    setValue('message', `${values.message || ''}{{name}}`);
  };

  const onSubmit = () => {
    if (!values.name || !values.message) return;

    navigate('SelectContacts', {
      ...values,
      next: 'ScheduleType',
    });
  };

  return (
    <>
      <Box backgroundColor="neutral-100">
        <Box width="90%" alignSelf="center">
          <Input
            {...useInput('name', (value: string) => value)}
            placeholder="Name"
          />
        </Box>
        <Box height="100%">
          <Box width="90%" alignSelf="center" marginVertical="small">
            <Input
              placeholder="Message..."
              multiline={true}
              minHeight={300}
              {...useInput('message', (value: string) => value)}
            />
          </Box>

          <Button onPress={addName}>Add Name</Button>
        </Box>
      </Box>
      <Box position="absolute" bottom={0} right={0}>
        <ArrowButton
          onPress={onSubmit}
          disabled={!values.name || !values.message}
        />
      </Box>
    </>
  );
};

export default EditCampaign;
