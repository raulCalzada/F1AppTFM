import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { GlobalVariablesProvider } from './settings/globalvariables'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalVariablesProvider>
      <App />
    </GlobalVariablesProvider>
  </React.StrictMode>
);
