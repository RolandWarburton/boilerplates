import React from 'react';
import ReactDOM from 'react-dom';
import Home from './routes/home';
import Accounts from './routes/accounts';

import './styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import EditAccount from './pages/editAccount/editAccount';
import CreateAccount from './pages/createAccount/createAccount';
import Navigation from './components/navigation/navigation';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/accounts'} element={<Accounts />} />
          <Route path={'/accounts/create'} element={<CreateAccount />} />
          <Route path={'/accounts/:id'} element={<EditAccount />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
