import React from 'react';
import { Link } from 'react-router-dom';
import { Container, NavLink } from './styles';

function NLink(props: { text: string; to: string }) {
  const { text, to } = props;
  return (
    <Link style={{ textDecoration: 'none' }} to={to}>
      <NavLink>{text}</NavLink>
    </Link>
  );
}

function Navigation() {
  return (
    <Container>
      <NLink text={'Home'} to={'/'} />
      <NLink text={'Accounts'} to={'/accounts'} />
    </Container>
  );
}

export default Navigation;
