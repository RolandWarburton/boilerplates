import React from 'react';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@components/forms';

type Inputs = {
  name: string;
  age: number;
};

const defaultValues = {
  name: 'roland',
  age: 0
};

function getSettings(): Promise<Inputs> {
  return new Promise((resolve) => {
    chrome.storage.local.get('settings', async (result) => {
      if (result.settings) {
        const settings = result.settings as Inputs;
        resolve(settings);
      } else {
        resolve(defaultValues);
      }
    });
  });
}

function OptionsForm() {
  const [formLoaded, setFormLoaded] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm<Inputs>({
    defaultValues: defaultValues
  });

  useEffect(() => {
    // convert a type {name: string, age: number} to a union "name" | "number"
    type InputProperties = keyof Inputs;
    const doAsync = async () => {
      // read the settings from the browser storage
      let settings = await getSettings();
      if (settings == undefined) {
        settings = defaultValues;
      }
      // and set the form values
      for (const o of Object.keys(settings)) {
        setValue(o as InputProperties, settings[o as InputProperties]);
      }
      setFormLoaded(true);
    };
    doAsync();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    chrome.storage.local.set({ settings: data }, () => {
      console.log(data);
    });
  };
  console.log(watch('name'));

  if (formLoaded == false) {
    return <div>loading</div>;
  }

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
