// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import NoteDescription from '../../component/noteDescription';
import { injectGlobal } from 'styled-components';

const app = document.getElementById('app');

app && ReactDOM.render(
    <NoteDescription />,
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


