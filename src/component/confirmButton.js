// @flow
import React, { type Node } from 'react';
import { Modal } from 'antd';

type Config = {
    title: string,
    okText: string,
    cancelText: string,
    onOk: () => void,
}

type Props = {
    config: Config,
    children?: Node,
}

export default class ConfirmButton extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    _showConfirm() {
        Modal.confirm(this.props.config);
    }

    render() {
        let {
            config,
            children,
            ...others
        } = this.props;

        return (
            <a {...others} onClick={this._showConfirm.bind(this)} >{children}</a>
        );
    }
}
