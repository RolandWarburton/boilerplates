import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../components/navigation'

function Root() {
  return (
    <>
      <div>
        <Navigation/>
        <h1>Root</h1>
        {/* render children here */}
        <Outlet/>
      </div>
    </>
  )
}

export default Root
