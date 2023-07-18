import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeHOC from './components/common/ThemeHOC';
import store from './utils/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeHOC>
        <App />
      </ThemeHOC>
    </Provider>
  </BrowserRouter>,
);
