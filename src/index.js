import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import store from './Components/store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById('root')
);

