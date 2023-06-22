import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "jquery/dist/jquery.min.js"
import "popper.js/dist/umd/popper.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css';
import {   HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
   <App />
  </HashRouter>
   
 
);

