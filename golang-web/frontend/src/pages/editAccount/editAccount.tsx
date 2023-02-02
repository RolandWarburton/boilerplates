import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { API_ROOT, DOMAIN, PROTOCOL } from '../../constants';
import { IAccount } from '../../interfaces/account.interace';
import Form from './form';

interface ReturnValue {
  count: Number;
  result: IAccount;
}

function fetchAccount(id: string): () => Promise<ReturnValue | undefined> {
  return async (): Promise<ReturnValue | undefined> => {
    const res = await fetch(`${PROTOCOL}://${DOMAIN}/${API_ROOT}/account/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      }
    });
    if (res.status !== 200) {
      return undefined;
    }
    const result = await res.json();
    return result;
  };
}

function returnState(message: string) {
  return (
    <div>
      <p>{message}</p>
      <Link to={'/accounts'}>Back to accounts</Link>
    </div>
  );
}

function EditAccount() {
  const { id } = useParams();

  if (id === undefined) {
    return returnState('Error with ID, did you pass one?');
  }

  const fetcher = fetchAccount(id);
  const { data, status } = useQuery(id, fetcher, { refetchOnMount: true });

  if (status === 'idle') {
    return returnState('Idle...');
  }

  if (status === 'loading') {
    return returnState('Loading...');
  }

  if (status === 'error') {
    return returnState('Error');
  }

  if (data?.result === undefined) {
    return returnState('No account found');
  }

  return (
    <div>
      <Form data={data.result} />
    </div>
  );
}

export default EditAccount;
