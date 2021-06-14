import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { TIME_CLOSE_MESSAGE } from './utils/constants';
import { routeConfig } from './routeConfig';
import Login from './views/pages/Login/Login';
import Main from './views/Main';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export function App() {
  const accessToken = localStorage.getItem('token');
  if (!accessToken) {
    history.push('/login');
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        {accessToken && (
          <Main renderRouteUser={routeConfig} accessToken={accessToken} />
        )}
      </Switch>
      <ToastContainer autoClose={TIME_CLOSE_MESSAGE} />
    </BrowserRouter>
  );
}
