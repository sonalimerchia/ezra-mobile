import React from 'react';
import { useForm } from '../../Hooks';
import { ArrowButton, Box, Button, Input, TagButton } from '../../Components';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';

const Compose = () => {
  const { navigate } = useNavigation();
  const { values, useInput, setValue, isValid } = useForm({ message: '' });

  const addName = () => {
    setValue('message', `${values.message || ''}{{name}}`);
  };

  const onSubmit = () => {
    if (values.message) {
      const params = { message: values.message, prior: 'Compose' };
      setValue('message', '');
      navigate('SelectContacts', params);
    }
  };

  return (
    <Box backgroundColor="neutral-100" height="100%">
      <Box width="90%" alignSelf="center" justifyContent="space-between" row>
        <TagButton label="Add Name" onPress={addName} />
        <TagButton label="Done" onPress={() => Keyboard.dismiss()} />
      </Box>
      <Box width="90%" alignSelf="center" marginVertical="small">
        <Input
          placeholder="Message..."
          multiline={true}
          minHeight={300}
          {...useInput('message', (value: string) => value)}
        />
      </Box>
      <Box position="absolute" bottom={0} right={0}>
        <ArrowButton onPress={onSubmit} disabled={!isValid} />
      </Box>
    </Box>
  );
};

export default Compose;
