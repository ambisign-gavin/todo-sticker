// @flow
import React from 'react';

type Props = {
    name: string
}

export default (props: Props) => (
    <div>Hello {props.name}</div>
)