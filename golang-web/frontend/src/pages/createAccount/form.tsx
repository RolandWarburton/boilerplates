import React from 'react';
import { Field, Formik, FormikHelpers } from 'formik';
import { IAccount } from '../../interfaces/account.interace';
import { FormContainer } from './style';
import { API_PORT, API_ROOT, DOMAIN, PROTOCOL } from '../../constants';

function Form() {
  const handleSubmit = async (values: IAccount, formikHelpers: FormikHelpers<IAccount>) => {
    const { setSubmitting } = formikHelpers;
    const baseUrl = `${PROTOCOL}://${DOMAIN}:${API_PORT}/${API_ROOT}/account`;
    const req = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token') || ''
      },
      body: JSON.stringify({
        username: values.username,
        password: btoa(`${values.username}:${values.password}`),
        is_staff: values.is_staff
      })
    });
    const res = (await req.json()) as IAccount;
    alert(JSON.stringify(res, null, 2));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        id: '',
        is_staff: true,
        created_at: Date.now().toString(),
        updated_at: Date.now().toString()
      }}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <FormContainer onSubmit={formik.handleSubmit}>
          <label htmlFor="username">
            <p>Username</p>
            <input id="username" type="text" {...formik.getFieldProps('username')} />
          </label>
          <label htmlFor="password">
            <p>password</p>
            <input id="password" type="text" {...formik.getFieldProps('password')} />
          </label>
          <label>
            <p>Is Staff</p>
            <Field type="checkbox" name="is_staff" />
          </label>
          <button type="submit">Submit</button>
        </FormContainer>
      )}
    </Formik>
  );
}

export default Form;
