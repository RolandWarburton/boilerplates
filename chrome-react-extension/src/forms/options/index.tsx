import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/forms';
// import { Input } from '@mui/material';
// import { Input } from '@material-ui/core';

type Inputs = {
  name: string;
  age: number;
};

function submit(data: Inputs) {
  console.log(data);
}

function OptionsForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      name: 'roland',
      age: 0
    }
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submit(data);
  };
  console.log(watch('name'));

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="number" {...register('name', { required: 'required field here' })} />
        {errors.name?.message}
        {errors.name && <span> this field is required ({errors.name.type}) </span>}
        <input type="submit" />
      </form>
    </div>
  );
  // <Input {...register('name', { required: 'required field here' })} />
}

export { OptionsForm };
