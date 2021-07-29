import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initialFirebase } from './firebase';

initialFirebase()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

