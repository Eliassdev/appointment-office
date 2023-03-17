import React from 'react';
import ReactDOM from 'react-dom/client';
//Local Imports
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
