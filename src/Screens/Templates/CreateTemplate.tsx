import React, { useState } from 'react';
import { useForm, useTemplates } from '../../Hooks';
import {
  ArrowButton,
  BottomSheet,
  Box,
  Button,
  Input,
  TagButton,
  Text,
} from '../../Components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TemplateParamTypes } from '../../Navigation/StackParamList';
import { Keyboard } from 'react-native';

type RouteProps = RouteProp<TemplateParamTypes, 'CreateTemplate'>;

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index && value !== 'name';
}

const validate = (values: any) => {
  return values.message && values.name;
};

const findTags = (message: string) => {
  const matches = message.match(/{{[\w\d]+}}/g);
  if (!matches) return [];
  const unwrappedTags = matches?.map(m => m.substr(2, m.length - 4));
  return unwrappedTags.filter(onlyUnique);
};

const CreateTemplate = () => {
  const { navigate, goBack } = useNavigation();
  const { params: template } = useRoute<RouteProps>();
  const isEdit = !!template?.id;
  const { createTemplate, updateTemplate } = useTemplates();
  const [tagsVisible, setTagsVisible] = useState<boolean>(false);

  const { values, useInput, setValue, isValid } = useForm({
    message: template?.message || '',
    name: template?.name || '',
  });
  const tags = findTags(values.message);

  const addName = () => {
    setValue('message', `${values.message || ''}{{name}}`);
  };

  const onSubmit = () => {
    if (validate(values)) {
      const data: any = {
        name: values.name,
        tags: findTags(values.message),
        message: values.message,
      };

      if (isEdit) {
        data.id = template?.id;
        updateTemplate(data);
      } else {
        createTemplate(data);
      }
      navigate('Templates');
    }
  };

  return (
    <>
      <BottomSheet visible={tagsVisible} onClose={() => setTagsVisible(false)}>
        <Box padding="base">
          <Box padding="tiny">
            <Text variant="label-1" color="neutral-700">
              TAGS:
            </Text>
          </Box>

          {tags.map((t: string, i: number) => (
            <Box paddingHorizontal="tiny" paddingVertical="xTiny" key={t}>
              <Text variant="body-1">{`${i + 1}.)  ${t}`}</Text>
            </Box>
          ))}
        </Box>
      </BottomSheet>
      <Box backgroundColor="neutral-100">
        <Box width="90%" alignSelf="center">
          <Input
            {...useInput('name', (value: string) => value)}
            placeholder="Name"
          />
        </Box>
        <Box padding="tiny" marginTop="tiny" width="90%" alignSelf="center">
          <Text variant="body-2">
            To add a fillable tag to your template, simply enclose the name of
            the tag with double braces.
          </Text>
          <Text
            variant="caption-1"
            color="neutral-700">{`Ex.) {{address}} will create the tag 'address'`}</Text>
        </Box>
        <Box height="100%">
          <Box
            width="90%"
            alignSelf="center"
            justifyContent="space-between"
            row>
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

          <Box width="90%" alignSelf="center" row>
            <Box flex={1}>
              {tags.length > 0 && (
                <Button onPress={() => setTagsVisible(true)}>View Tags</Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box position="absolute" bottom={0} right={0}>
        <ArrowButton
          onPress={onSubmit}
          disabled={!values.name || !values.message}
        />
      </Box>
      <Box position="absolute" bottom={0} left={0}>
        <ArrowButton onPress={() => goBack()} back />
      </Box>
    </>
  );
};

export default CreateTemplate;
