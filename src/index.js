import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components/App/App';
import { AppContext } from './utils/AppContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <AppContext>
        <App />
      </AppContext>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
