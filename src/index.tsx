import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import AuthContextProvider from './Contexts/AuthContext';
import './Styles/style.css';
import NotificationsContextProvider from './Contexts/NotificationContext';
import ScrollToTop from './Routes/ScrollTop';

const REACTENV = process.env

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationsContextProvider>
        <BrowserRouter basename={REACTENV.PUBLIC_URL+"/"}>
          <App />
          <ScrollToTop/>
        </BrowserRouter>
      </NotificationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);