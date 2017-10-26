import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { injectGlobal } from 'styled-components';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

injectGlobal`
    @font-face {
        font-family: 'Rubik Bold';
        src: url('../fonts/Rubik/Rubik-Bold.ttf');
    }
    @font-face {
        font-family: 'Rubik Italic';
        src: url('../fonts/Rubik/Rubik-Italic.ttf');
    }
    @font-face {
        font-family: 'Rubik Light';
        src: url('../fonts/Rubik/Rubik-Light.ttf');
    }
    @font-face {
        font-family: 'Rubik Medium';
        src: url('../fonts/Rubik/Rubik-Medium.ttf');
    }
    @font-face {
        font-family: 'Rubik Regular';
        src: url('../fonts/Rubik/Rubik-Regular.ttf');
    }

    html, body {
        background-color: #fff;
    }
`;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
