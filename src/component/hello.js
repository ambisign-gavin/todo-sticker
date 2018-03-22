// @flow
import React from 'react';
import { remote } from 'electron';
// const { remote } = require('electron')

type Props = {
    name: string
}

export default (props: Props) => (
    <div>Hello {props.name}</div>
)