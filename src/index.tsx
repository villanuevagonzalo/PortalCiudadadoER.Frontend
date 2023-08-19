import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import AuthContextProvider from './Contexts/AuthContext';
import './Styles/style.css';
import NotificationsContextProvider from './Contexts/NotificationContext';
import ScrollToTop from './Routes/ScrollTop';
import FormContextProvider from './Contexts/FormContext';
import ProcedureContext from './Contexts/ProcedureContext';
import CiudadanoFormContextProvider from './Contexts/CiudadanoFormContext';
import CiudadanoProcedureContextProvider from './Contexts/CiudadanoProcedureContext';

const REACTENV = process.env

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationsContextProvider>
        <ProcedureContext>
          <FormContextProvider>
            <CiudadanoProcedureContextProvider>
              <CiudadanoFormContextProvider>
                <BrowserRouter basename={REACTENV.PUBLIC_URL+"/"}>
                  <App />
                  <ScrollToTop/>
                </BrowserRouter>
                </CiudadanoFormContextProvider>
              </CiudadanoProcedureContextProvider>
            </FormContextProvider>
          </ProcedureContext>
      </NotificationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);