import React from 'react';
import { setup } from 'goober';
import { createRoot } from 'react-dom/client';
import { Options } from './pages/options'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

setup(React.createElement);
const domNode = document.getElementById('root');
const root = createRoot(domNode as HTMLElement);

const router = createBrowserRouter([
  {
    path: '*',
    element: <Options />
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
