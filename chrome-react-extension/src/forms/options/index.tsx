import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
        {/* example of passing the error in */}
        <Input
          type="text"
          error={errors.name}
          {...register('name', { required: 'required field here', minLength: 1 })}
        />
        {/* example of error text being seperate from the form Input*/}
        <Input type="number" {...register('age', { required: 'required field here', min: 18 })} />
        {errors.age && <span>{errors.age.type}</span>}
        <input type="submit" />
      </form>
    </div>
  );
}

export { OptionsForm };
