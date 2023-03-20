import React from 'react';
import ReactDOM from 'react-dom/client';
//Local Imports
import axios from 'axios';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/modular/store';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
