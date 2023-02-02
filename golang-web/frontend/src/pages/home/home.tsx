import React from 'react';
import Login from '../../components/login';
import { Container } from './index.styles';

function home() {
  return (
    <>
      <Container>
        <h1>Home</h1>
        <Login/>
      </Container>
    </>
  );
}

export default home;
