import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@pages/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const domNode = document.getElementById('root');
const root = createRoot(domNode as HTMLElement);

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
