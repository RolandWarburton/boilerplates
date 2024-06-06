import React from 'react';
import { Input as MUIInput } from '@mui/material';
import { FieldError, UseFormRegister } from 'react-hook-form';

type Inputs = {
  name: string;
  age: number;
};

interface InputProps extends ReturnType<UseFormRegister<Inputs>> {
  type: string;
  error?: FieldError | undefined;
}

const input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { name, onBlur, onChange, type, error } = props;
  const fieldValues = { name, onBlur, onChange, type };
  return (
    <>
      <MUIInput {...fieldValues} ref={ref} />
      {error && <span>{error.type}</span>}
    </>
  );
});

export default input;
