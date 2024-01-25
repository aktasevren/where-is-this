import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'alertifyjs/build/css/alertify.css';


import configureStore from './redux/store';
const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
