// @flow
import React from 'react';
import { Modal } from 'antd';
import Translate from '../../class/translate';

type Props = {
    todoId: number,
    handleDeleteTodo: (id: number) => void,
}

export default class DeleteTodoButton extends React.Component<Props> {

    showConfirm: Function;

    constructor(props: Props) {
        super(props);
        this.showConfirm = this.showConfirm.bind(this);
    }

    showConfirm() {
        let deleteTodo = this.props.handleDeleteTodo;
        let todoId = this.props.todoId;

        Modal.confirm(
            {
                title: Translate.tr('Are you sure delete this todo?'),
                okText: Translate.tr('Delete'),
                okType: 'danger',
                cancelText: Translate.tr('No'),
                onOk() {
                    deleteTodo(todoId);
                }
            }
        );
    }

    render() {
        let {
            handleDeleteTodo,
            todoId,
            ...others
        } = this.props;
        handleDeleteTodo;
        todoId;
        return (
            <a {...others} onClick={this.showConfirm} >{Translate.tr('Delete')}</a>
        );
    }
}
