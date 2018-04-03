// @flow
import React from 'react';
import { List, Icon } from 'antd';
import type {TodoState} from '../../states/index';
import moment from 'moment';
import './todoItem.scss';
import TodoActionButton from '../todoActionButton/TodoActionButton';
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

        return (
            <List.Item {...others} className='todo-item' actions={this.generateTodoActions()} >
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
                    {
                        todo.complete?<div className='complete-mark' >Complete</div>: null
                    }
                </div>

            </List.Item>
        );
    }
}
