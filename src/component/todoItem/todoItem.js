// @flow
import React from 'react';
import { Icon } from 'antd';
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
    narrowDescriptionIfNeed: Function;

    constructor(props: Props) {
        super(props);
        this.generateTodoActions = this.generateTodoActions.bind(this);
        this.narrowDescriptionIfNeed = this.narrowDescriptionIfNeed.bind(this);
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
            return (
                <TodoActionButton todo={this.props.todo} enableEdit enableComplete />
            );
        }
        return (
            <TodoActionButton todo={this.props.todo} />
        );
    }

    narrowDescriptionIfNeed(description: string): string {
        let splitDescriptions: Array<string> = description.split(/\r\n|\r|\n/);
        let lineCount: number = splitDescriptions.length;
        if (lineCount <= 2) {
            return description;
        }
        let showNarrow: string = splitDescriptions[0] + '\r\n' + splitDescriptions[1] + '\r\n ...'  ;
        return showNarrow;
    }

    render() {
        let {
            todo,
            ...others
        } = this.props;

        return (
            <div className='todo-item' {...others}>
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
                        <p>{this.narrowDescriptionIfNeed(todo.description)}</p>
                    </div>
                    <div className="action-btn">
                        {this.generateTodoActions()}
                    </div>
                    {
                        todo.complete?<div className='complete-mark' >Complete</div>: null
                    }
                </div>
            </div>
        );
    }
}
