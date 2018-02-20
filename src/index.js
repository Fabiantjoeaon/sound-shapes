import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { injectGlobal } from 'styled-components';
import './css/index.css';
import './scene/';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

injectGlobal`
    html, body {
        background-color: #fff;
        position: relative;
        overflow: hidden;
    }

    *{
        -webkit-font-smoothing: antialiased;
    }

    .container {
        height: 100vh;

        .scene {
            z-index: -1;
            height: 100%;
        }

        .synth {
            z-index: 0;
        }
    }
`;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('.synth')
);
registerServiceWorker();
