// @flow
import React from 'react';
import { List, Icon } from 'antd';
import type { TodoState } from '../../states';
import './todoList.scss';
import moment from 'moment';
import EditModal from '../../container/editTodoModalContainer';
import Translate from '../../class/translate';

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

    generateTime(date: ?number, time: ?number) {
        let notificationString = '';
        if (date != null) {
            notificationString += moment(date).format('YYYY/MM/DD');
        }
        if (time != null) {
            notificationString += ' - ' + moment(time).format('HH:mm');
        }
        return notificationString;
    }

    render() {
        return (
            <div>
                <List
                    dataSource={this.props.todoLists}
                    renderItem={
                        (item: TodoState) => (
                            <List.Item actions={[<a onClick={() => this.handleEditTodo(item)} >edit</a>, <a>delete</a>]} >
                                <div className="list-row"  >
                                    <div className="clock">
                                        <Icon type="clock-circle-o" />
                                    </div>
                                    <div className="notification-time">
                                        {this.generateTime(item.notificationDate, item.notificationTime)}
                                    </div>
                                    <div className="description">
                                        {item.description}
                                    </div>
                                </div>
                            </List.Item>
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