// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import StickerDescription from '../../component/stickerDescription';
import { injectGlobal } from 'styled-components';

const app = document.getElementById('app');

app && ReactDOM.render(
    <StickerDescription />,
    app
);

injectGlobal`
    body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        background-color: #f7f7a3;
        overflow-wrap: break-word;
        overflow-x: hidden;
        -webkit-user-select: none;
        -webkit-app-region: drag;
    }
`;


