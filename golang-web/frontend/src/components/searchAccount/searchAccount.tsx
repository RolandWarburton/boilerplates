import React, { useState } from 'react';
import { API_PORT, API_ROOT, DOMAIN, PROTOCOL } from '../../constants';
import { IAccount } from '../../interfaces/account.interace';

function SearchAccount() {
  const [id, setID] = useState('');

  const handleBlur = async (event: React.FormEvent<HTMLInputElement>) => {
    const url = `${PROTOCOL}://${DOMAIN}:${API_PORT}/${API_ROOT}`;
    const req = await fetch(`${url}/accounts?username=${event.currentTarget.value}`);
    const res = (await req.json()) as { count: number; result: IAccount[] };
    setID(res.result[0].id);
  };

  return (
    <div>
      <label htmlFor="account_id">
        <p>Account Lookup</p>
        <input onBlur={handleBlur} id="account_id" type="text" />
        <p>{id}</p>
      </label>
    </div>
  );
}

export default SearchAccount;
