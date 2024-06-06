import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/forms';

type Inputs = {
  name: string;
  age: number;
};

function submit(data: Inputs) {
  console.log(data);
}

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

function setDefaultSettings(setFunc: React.Dispatch<Inputs>) {
  chrome.storage.local.set({ settings: defaultValues }, () => {
    setFunc(defaultValues);
  });
}

function OptionsForm() {
  const [settings, setSettings] = useState<undefined | Inputs>(undefined);

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
    const doAsync = async () => {
      const settings = await getSettings();
      console.log(settings);
      if (settings == undefined) {
        setDefaultSettings(setSettings);
      } else {
        setSettings(settings);
        for (const o of Object.keys(settings)) {
          setValue(o, settings[o]);
        }
      }
    };
    doAsync();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    chrome.storage.local.set({ settings: data }, () => {
      setSettings(data);
    });
    submit(data);
  };
  console.log(watch('name'));

  if (settings == undefined) {
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
      {JSON.stringify(settings)}
    </div>
  );
}

export { OptionsForm };
