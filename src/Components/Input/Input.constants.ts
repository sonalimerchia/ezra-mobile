import {
  TextInputIOSProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
} from 'react-native';

type TextContentTypes = TextInputIOSProps['textContentType'];

export type BaseInputProps = Readonly<{
  cleanable?: boolean;
  disabled?: boolean;
  error?: string;
  helper?: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
  minHeight?: number;
  textContentType?: TextContentTypes;
  value: string;
  onChangeText: (value: string) => void;
  onClean?: (newValue: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onSubmitEditing?: () => void;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCompleteType?: TextInputProps['autoCompleteType'];
  autoCorrect?: boolean;
  keyboardType?: KeyboardTypeOptions;
  defaultValue?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  returnKeyLabel?: string;
  showError?: boolean;
  innerRef?: React.Ref<TextInput>;
  testID?: string;
}>;
