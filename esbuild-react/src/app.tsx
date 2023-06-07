import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// routes
import Root from './routes/root';
import NotFound from './routes/routeError';
import HexExample from './routes/hexExample';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        // this child will be rendered in the <outlet/> of the <Root/>
        {
          path: 'hex/:hex',
          element: <HexExample />,
          loader: async ({ params }) => {
            return params.hex;
          }
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
