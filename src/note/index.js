// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import NoteDescription from '../component/note/noteDescription';
import './index.scss';

const app = document.getElementById('app');

app && ReactDOM.render(
    <NoteDescription />,
    app
);


