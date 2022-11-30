import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { CookiesProvider, Cookies } from 'react-cookie';

// Importing the styles
import './scss/custom.scss';




ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
           
                <App />
           
        </CookiesProvider>
       
    </React.StrictMode>,
    
    document.getElementById('root'));


console.log(process.env.NODE_ENV)
