// @flow
import React from 'react';
import { List, Icon } from 'antd';
import type {TodoState} from '../../states/index';
import moment from 'moment';
import './todoItem.scss';
import TodoActionButton from '../todoActionButton/TodoActionButton';
import Classnames from 'classnames';

type Props = {
    todo: TodoState
}

export default class TodoItem extends React.Component<Props> {

    generateTodoActions: Function;

    constructor(props: Props) {
        super(props);
        this.generateTodoActions = this.generateTodoActions.bind(this);
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

    generateTodoActions() {
        if (!this.props.todo.complete) {
            return ([
                <TodoActionButton todo={this.props.todo} />
            ]);
        }
    }

    render() {
        let {
            todo,
            ...others
        } = this.props;

        let statusClass = Classnames({
            'todo-item': true,
            'complete': todo.complete,
        });

        return (
            <List.Item {...others} className={statusClass} actions={this.generateTodoActions()} >
                <div className='list-row'  >
                    <div className="clock">
                        <Icon type="clock-circle-o" />
                    </div>
                    <div className="notification-time">
                        {this.generateTime(todo.dueDatetime, todo.dueDatetime)}
                    </div>
                    <div className="description">
                        {todo.description}
                    </div>
                </div>
            </List.Item>
        );
    }
}
