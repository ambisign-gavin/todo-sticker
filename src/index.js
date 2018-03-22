import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './component/hello';

const { remote } = require('electron')
ReactDOM.render(
    <Hello name="Gavin" />,
    document.getElementById("app")
)