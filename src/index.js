import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/containers/App';


import * as serviceWorker from './serviceWorker';
import { configureFakeBackend } from 'api/fake-backend';
configureFakeBackend();

const rootElement = document.getElementById('root')
ReactDOM.render(
        <App />
    , rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
