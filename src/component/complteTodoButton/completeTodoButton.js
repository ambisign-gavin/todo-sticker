// @flow
import React from 'react';
import { Modal } from 'antd';
import Translate from '../../class/translate';

type Props = {
    todoId: number,
    handleCompleteTodo: (id: number) => void,
}

export default class CompleteTodoButton extends React.Component<Props> {

    showConfirm: Function;

    constructor(props: Props) {
        super(props);
        this.showConfirm = this.showConfirm.bind(this);
    }

    showConfirm() {
        let completeTodo = this.props.handleCompleteTodo;
        let todoId = this.props.todoId;
        
        Modal.confirm(
            {
                title: Translate.tr('Are you sure complete this todo?'),
                okText: Translate.tr('Complete'),
                cancelText: Translate.tr('No'),
                onOk() {
                    completeTodo(todoId);
                }
            }
        );
    }

    render() {
        let {
            handleCompleteTodo,
            todoId,
            ...others
        } = this.props;
        handleCompleteTodo;
        todoId;
        return (
            <a {...others} onClick={this.showConfirm} >Complete</a>
        );
    }
}
