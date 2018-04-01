// @flow
import React from 'react';
import { List } from 'antd';
import type { TodoState } from '../../states';
import './todoList.scss';
import EditModal from '../../container/editTodoModalContainer';
import Translate from '../../class/translate';
import TodoItem from '../todoItem/todoItem';

type Props = {
    todoLists: TodoState[]
}

type States = {
    visibleModal: boolean,
    selectedId: number,
    selectedNotificationDate: ?number,
    selectedNotificationTime: ?number,
    selectedDescription: string,
}

export default class TodoList extends React.Component<Props, States> {

    handleEditTodo: Function;
    handleEditSaved: Function;

    state = {
        visibleModal: false,
        selectedId: 0,
        selectedNotificationDate: null,
        selectedNotificationTime: null,
        selectedDescription: '',
    }

    constructor(props: Props) {
        super(props);
        this.handleEditTodo = this.handleEditTodo.bind(this);
        this.handleEditSaved = this.handleEditSaved.bind(this);
    }

    handleEditSaved() {
        this.setState ({ visibleModal: false });
    }

    handleEditTodo(todo: TodoState) {
        this.setState({
            visibleModal: true,
            selectedId: todo.id,
            selectedDescription: todo.description,
            selectedNotificationDate: todo.notificationDate,
            selectedNotificationTime: todo.notificationTime,
        });
    }

    render() {
        return (
            <div>
                <List
                    dataSource={this.props.todoLists}
                    renderItem={
                        (todo: TodoState) => (
                            <TodoItem todo={todo} onEditTodo={this.handleEditTodo} />

                        )
                    }
                />
                <EditModal
                    title={Translate.tr('Edit Todo')}
                    visible={this.state.visibleModal}
                    onSave={this.handleEditSaved}
                    onCancel={() => this.setState({visibleModal: false})}
                    todoId={this.state.selectedId}
                    defaultDate={this.state.selectedNotificationDate || new Date().getTime()}
                    defaultTime={this.state.selectedNotificationTime || new Date().getTime()}
                    defaultDescription={this.state.selectedDescription}
                />
            </div>
        );
    }

}
