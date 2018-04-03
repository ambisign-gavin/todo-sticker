// @flow
import React from 'react';
import { List, Icon } from 'antd';
import type {TodoState} from '../../states/index';
import moment from 'moment';
import './todoItem.scss';
import TodoActionButton from '../todoActionButton/TodoActionButton';
import Classnames from 'classnames';
import Translate from '../../class/translate';

type Props = {
    todo: TodoState
}

export default class TodoItem extends React.Component<Props> {

    generateTodoActions: Function;

    constructor(props: Props) {
        super(props);
        this.generateTodoActions = this.generateTodoActions.bind(this);
    }

    generateTime(datetime: ?number) {
        let notificationString = '';
        if (datetime != null) {
            notificationString += moment(datetime).format('YYYY/MM/DD HH:mm');
        }
        return notificationString;
    }

    generateTodoActions() {
        if (!this.props.todo.complete) {
            return ([
                <TodoActionButton todo={this.props.todo} enableEdit enableComplete />
            ]);
        }
        return ([
            <TodoActionButton todo={this.props.todo} />
        ]);
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
                        {this.generateTime(todo.dueDatetime)}
                    </div>
                    <div className="create-time">
                        <span>{Translate.tr('Creat at: ')}</span>{this.generateTime(todo.createTime)}
                    </div>
                    <div className="description">
                        {todo.description}
                    </div>
                </div>
            </List.Item>
        );
    }
}
