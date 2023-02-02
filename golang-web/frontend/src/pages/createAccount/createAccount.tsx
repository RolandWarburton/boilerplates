import React from 'react';
import { Link } from 'react-router-dom';
import Form from './form';

function CreateAccount() {
  return (
    <div>
      <Link to={'/accounts'}>Accounts</Link>
      <Form />
    </div>
  );
}

export default CreateAccount;
