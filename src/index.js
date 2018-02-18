import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {injectGlobal} from 'styled-components';
import './css/index.css';
import './scene/';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

injectGlobal `
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

    @font-face {
        font-family: 'Trirong Thin';
        src: url('../fonts/Trirong/Trirong-Thin.ttf');
    }
    @font-face {
        font-family: 'Trirong Thin Italic';
        src : url('../fonts/Trirong/Trirong-ThinItalic.ttf');
    }
    @font-face {
        font-family: 'Trirong Medium Italic';
        src : url('../fonts/Trirong/Trirong-MediumItalic.ttf');
    }

    

    html, body {
        background-color: #fff;
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
    <App/>
</Provider>, document.querySelector('.synth'));
registerServiceWorker();
