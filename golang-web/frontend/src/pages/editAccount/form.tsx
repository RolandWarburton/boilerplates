import React from 'react';
import { Field, Formik, FormikHelpers } from 'formik';
import { IAccount } from '../../interfaces/account.interace';
import { FormContainer } from './style';
import { API_PORT, API_ROOT, DOMAIN, PROTOCOL } from '../../constants';

interface Props {
  data: IAccount;
}
function Form(props: Props) {
  const { data } = props;
  const handleSubmit = async (values: IAccount, formikHelpers: FormikHelpers<IAccount>) => {
    const { setSubmitting } = formikHelpers;
    const baseUrl = `${PROTOCOL}://${DOMAIN}:${API_PORT}/${API_ROOT}/account/${data.id}`;
    const req = await fetch(`${baseUrl}?username=${values.username}&is_staff=${values.is_staff}`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('token') || ''
      }
    });
    const res = (await req.json()) as IAccount;
    alert(JSON.stringify(res));
    setSubmitting(false);
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {(formik) => (
        <FormContainer onSubmit={formik.handleSubmit}>
          <label htmlFor="id">
            <p>ID</p>
            <input id="id" type="text" disabled={true} {...formik.getFieldProps('id')} />
          </label>
          <label htmlFor="username">
            <p>Username</p>
            <input id="username" type="text" {...formik.getFieldProps('username')} />
          </label>
          <label>
            <p>Is Staff</p>
            <Field type="checkbox" name="is_staff" />
          </label>
          <label htmlFor="created_at">
            <p>Created At</p>
            <input
              id="created_at"
              type="text"
              disabled={true}
              {...formik.getFieldProps('created_at')}
            />
          </label>
          <label htmlFor="updated_at">
            <p>Updated At</p>
            <input
              id="updated_at"
              type="text"
              disabled={true}
              {...formik.getFieldProps('updated_at')}
            />
          </label>
          <button type="submit">Submit</button>
        </FormContainer>
      )}
    </Formik>
  );
}

export default Form;
