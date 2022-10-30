import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContextProvider from './Contexts/AuthContext';
import reportWebVitals from './reportWebVitals';
import './Styles/style.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();