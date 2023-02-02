import React from 'react';
import { API_PORT, API_ROOT, DOMAIN, PROTOCOL } from '../../constants';

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = async () => {
    const payload = JSON.stringify({
      username: username,
      password: btoa(`${username}:${password}`)
    });

    console.log(btoa('password'))

    const url = `${PROTOCOL}://${DOMAIN}:${API_PORT}/${API_ROOT}/auth`;
    const req = await fetch(url, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res = await req.json();
    alert(JSON.stringify(res));
    localStorage.setItem('token', 'Bearer ' + res.data.token);
  };

  return (
    <div>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder={'username'}
        type={'text'}
        id={'username'}
      />
      <br />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder={'password'}
        type={'text'}
        id={'password'}
      />
      <br />
      <button onClick={handleLogin}>login</button>
    </div>
  );
}

export default Login;
