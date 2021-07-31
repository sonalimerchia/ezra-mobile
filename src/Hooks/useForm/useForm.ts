import { useState } from 'react';

type FormInputReturnVals = {
  showError?: boolean;
  label: string;
  value: string;
  onChangeText: (value: string) => void;
};

type useFormReturnVals = {
  values: any;
  errors: string[];
  isValid: boolean;
  setValue: (label: string, value: any) => void;
  useInput: (label: string, validate?: any) => FormInputReturnVals;
};

const useForm = (defaultValues: any): useFormReturnVals => {
  const [values, setValues] = useState<any>(defaultValues);
  const [touched, setTouched] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const useInput = (label: string, validate?: any): FormInputReturnVals => {
    const [error, setError] = useState<boolean>();

    const onChangeText = (text: string) => {
      setTouched(true);

      if (validate && !validate(text)) {
        setError(true);
        setErrors(errors.concat([label]));
      } else {
        setError(false);
        setErrors(errors.filter(e => e !== label));
      }
      setValues((vals: any) => ({ ...vals, [label]: text }));
    };

    return {
      label,
      showError: error ? true : undefined,
      value: values[label],
      onChangeText,
    };
  };

  const setValue = (label: string, value: string) => {
    setValues((vals: any) => ({ ...vals, [label]: value }));
  };

  return {
    values,
    isValid: errors.length === 0 && touched,
    useInput,
    setValue,
    errors,
  };
};

export default useForm;
