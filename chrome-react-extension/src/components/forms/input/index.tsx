import React from 'react';
// import { Control, Controller, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { Input as MUIInput } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

type Inputs = {
  name: string;
  age: number;
};

interface InputProps extends ReturnType<UseFormRegister<Inputs>> {
  type: string;
}

const input = React.forwardRef<HTMLInputElement, InputProps>(
function Input(field, ref) {
  return (
    <>
      <MUIInput {...field} ref={ref} />
    </>
  );
});

export default input;
