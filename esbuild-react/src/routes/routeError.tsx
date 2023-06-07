import React from 'react';
import { useRouteError } from 'react-router-dom';

function routeError() {
  const error = (useRouteError()) as any;
  // eslint-disable-next-line no-console
  console.error(error)
  return (
    <>
      <div>error page</div>
      <p>{error.statusText || error.message}</p>
    </>
  )
}

export default routeError
