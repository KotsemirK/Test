import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { setupStore } from './redux/store/store';

import App from './App';

const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
