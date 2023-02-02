import React from 'react';
import { Container } from './index.styles';
import { useQuery } from 'react-query';
import { IAccount } from '../../interfaces/account.interace';
import Table from './table';
import { PROTOCOL, DOMAIN, API_ROOT } from '../../constants';
import { Link } from 'react-router-dom';

interface ReturnValue {
  count: Number;
  result: IAccount[];
}

async function fetchAccounts(): Promise<ReturnValue | undefined> {
  const res = await fetch(`${PROTOCOL}://${DOMAIN}/${API_ROOT}/accounts`, {
    headers: {
      Authorization: localStorage.getItem('token') || ''
    }
  });
  if (res.status !== 200) {
    return undefined;
  }
  return res.json();
}

function accounts() {
  const { data, status } = useQuery('accounts', fetchAccounts, { refetchOnMount: true });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error</p>;
  }

  if (data?.result === undefined) {
    return <p>No Accounts Found</p>;
  }

  return (
    <Container>
      <h1>Accounts</h1>
      <Link to={'create'}>Create Account</Link>
      <Table data={data.result} />
    </Container>
  );
}

export default accounts;
