import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <>
      {/* link to go somewhere */}
      <Link to={'/'}>home </Link>
      <Link to={'/hex/22f07c'}>test</Link>
    </>
  )
}

export default Navigation
