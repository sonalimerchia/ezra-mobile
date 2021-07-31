import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { TemplateParamTypes } from '../../Navigation/StackParamList';
import {
  Box,
  Text,
  ScrollContainer,
  Input,
  ArrowButton,
  TagButton,
} from '../../Components';
import { useEffect } from 'react';
import { useForm, useTemplates } from '../../Hooks';
import { Template } from 'common-types';
import { Keyboard } from 'react-native';

type RouteProps = RouteProp<TemplateParamTypes, 'UseTemplate'>;

const UseTemplate = () => {
  const { goBack, navigate } = useNavigation();
  const { params: template } = useRoute<RouteProps>();
  const { message, tags } = template;
  const { values, useInput } = useForm({});

  useEffect(() => {
    if (!template) {
      goBack();
    }
  }, [template]);

  const parseMessage = () => {
    let parsed = message;
    for (const tag of tags) {
      if (values[tag]) {
        const regex = new RegExp(`\{\{${tag}\}\}`, 'g');
        parsed = parsed.replace(regex, values[tag]);
      }
    }
    return parsed;
  };

  const validate = () => {
    for (const tag of tags) {
      if (!values[tag]) return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (validate()) {
      navigate('SelectContacts', {
        message: parseMessage(),
        prior: 'Template',
      });
    }
  };

  return (
    <Box height="100%" padding="small" backgroundColor="neutral-100">
      <Box alignItems="flex-end">
        <TagButton onPress={() => Keyboard.dismiss()} label="Done" />
      </Box>
      <Box width="90%" alignSelf="center">
        <Text variant="body-1">{parseMessage()}</Text>
      </Box>
      <Box>
        {template.tags.map(tag => (
          <Box key={tag} width="90%" alignSelf="center" paddingVertical="small">
            <Input
              {...useInput(tag, (value: string) => value)}
              placeholder={tag}
            />
          </Box>
        ))}
      </Box>
      <Box position="absolute" bottom={0} right={0}>
        <ArrowButton onPress={onSubmit} disabled={!validate()} />
      </Box>
      <Box position="absolute" bottom={0} left={0}>
        <ArrowButton onPress={goBack} back />
      </Box>
    </Box>
  );
};

export default UseTemplate;
