import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Routes/Router'

import { LocationProvider } from './Context/LocationContext'

import './Styles/style.scss'

ReactDOM.render(
  <React.StrictMode>
    <LocationProvider>
      <Router />
    </LocationProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);