import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';

import { store } from './store/store.ts';
import App from './App.tsx';
import './index.css';
import { Auth } from './components/IsLoading.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth>
    </Provider>
  </React.StrictMode>
);
