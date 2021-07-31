import React, { useState, useEffect } from 'react';
import { Keyboard, TextInput } from 'react-native';
import styled, { Colors } from 'styled-components/native';
import { ms } from 'react-native-size-matters';

import Text from '../Text';
import Box from '../Box';
import { lightTheme } from '../../Config';
import { BaseInputProps } from './Input.constants';

const Input = React.forwardRef(
  (
    {
      disabled = false,
      error,
      label,
      placeholder,
      maxLength,
      textContentType = 'none',
      value,
      onChangeText,
      secureTextEntry,
      autoFocus,
      autoCapitalize,
      autoCompleteType,
      autoCorrect,
      keyboardType,
      defaultValue,
      returnKeyType,
      onSubmitEditing,
      returnKeyLabel,
      showError,
      multiline,
      minHeight = 48,
      testID,
    }: BaseInputProps,
    ref: React.Ref<TextInput>,
  ) => {
    const defaultRef = React.useRef<TextInput>(null);
    const theme = lightTheme;
    const [inputValue, setInputValue] = useState(value);
    const [focused, setFocused] = useState<boolean>(false);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <Box width="100%">
        <Box
          width="100%"
          position="relative"
          minHeight={minHeight}
          shapeFill={disabled ? 'neutral-100' : 'neutral-200'}
          borderRadius="base"
          paddingBottom="tiny"
          paddingTop="tiny"
          paddingLeft="small"
          paddingRight="small"
          borderWidth={error || showError || focused ? 'large' : undefined}
          borderColor={
            error || showError ? 'error' : focused ? 'primary' : undefined
          }>
          <Text variant="caption-1" color="neutral-900">
            {placeholder || label}
          </Text>
          <TextInput
            ref={defaultRef}
            editable={!disabled}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            autoCompleteType={autoCompleteType}
            autoCorrect={autoCorrect}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            defaultValue={defaultValue}
            returnKeyType={returnKeyType}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            returnKeyLabel={returnKeyLabel}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : undefined}
            style={{
              width: '100%',
              height: ms(minHeight !== 48 ? minHeight : 21),
              ...theme.fontStyles['body-2'],
              color: theme.backgroundColors['neutral-900'],
            }}
            textContentType={textContentType}
            value={inputValue}
            onChangeText={(text: string) => {
              setInputValue(text);
              onChangeText(text);
            }}
            testID={testID}
            enablesReturnKeyAutomatically
          />
        </Box>
      </Box>
    );
  },
);

const Helper = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacings.tiny}px;
`;

export default Input;
