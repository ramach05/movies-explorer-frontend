import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.css';
import App from './components/App/App';
import { AppContext } from './utils/AppContext';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>

      <AppContext>
        <App />
      </AppContext>

    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// import reportWebVitals from "./reportWebVitals";
// import { AppContext } from './utils/AppContext';
