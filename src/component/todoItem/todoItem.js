// @flow
import React from 'react';
import { List, Icon } from 'antd';
import type {TodoState} from '../../states/index';
import moment from 'moment';
import './todoItem.scss';
import TodoActionButton from '../todoActionButton/TodoActionButton';

type Props = {
    todo: TodoState
}

export default class TodoItem extends React.Component<Props> {

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
        let {
            todo,
            ...others
        } = this.props;

        return (
            <List.Item {...others} actions={[<TodoActionButton todo={todo} />]} >
                <div className="list-row"  >
                    <div className="clock">
                        <Icon type="clock-circle-o" />
                    </div>
                    <div className="notification-time">
                        {this.generateTime(todo.notificationDate, todo.notificationTime)}
                    </div>
                    <div className="description">
                        {todo.description}
                    </div>
                </div>
            </List.Item>
        );
    }
}
