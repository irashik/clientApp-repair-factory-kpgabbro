import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { CookiesProvider, Cookies } from 'react-cookie';

// Importing the Bootstrap CSS
//import '../bower_components/bootstrap/dist/css/bootstrap.min.css';




ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
           <BrowserRouter>
                <App />
            </BrowserRouter>
        </CookiesProvider>
       
    </React.StrictMode>,
    
    document.getElementById('root'));



