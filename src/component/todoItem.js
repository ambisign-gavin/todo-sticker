// @flow
import React from 'react';
import { Icon } from 'antd';
import type {TodoState} from '../states/index';
import moment from 'moment';
import TodoActionButton from '../container/todoActionButton';
import Translate from '../class/translate';
import styled from 'styled-components';

type Props = {
    todo: TodoState
}

export default class TodoItem extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    _generateTime(datetime: ?number) {
        let notificationString = '';
        if (datetime != null) {
            notificationString += moment(datetime).format('YYYY/MM/DD HH:mm');
        }
        return notificationString;
    }

    _generateTodoActions() {
        if (!this.props.todo.complete) {
            return (
                <TodoActionButton todo={this.props.todo} enableEdit enableComplete />
            );
        }
        return (
            <TodoActionButton todo={this.props.todo} />
        );
    }

    _narrowDescriptionIfNeed(description: string): string {
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
            <TodoItemDiv {...others}>
                <LowDiv>
                    <ClockDiv>
                        <Icon type="clock-circle-o" />
                    </ClockDiv>
                    <div style={{ gridArea: 'notification-time' }}>
                        {this._generateTime(todo.dueDatetime)}
                    </div>
                    <CreatedTimeDiv>
                        <span>{Translate.tr('Creat at: ')}</span>{this._generateTime(todo.createTime)}
                    </CreatedTimeDiv>
                    <DescriptionDiv>
                        <p>{this._narrowDescriptionIfNeed(todo.description)}</p>
                    </DescriptionDiv>
                    <ActionButtonDiv>
                        {this._generateTodoActions()}
                    </ActionButtonDiv>
                    {
                        todo.complete?<CompleteMarkDiv>Complete</CompleteMarkDiv>: null
                    }
                </LowDiv>
            </TodoItemDiv>
        );
    }
}

const TodoItemDiv = styled.div`
    padding: 5px;
    border-top: 2px solid #ebebeb;
    transition: box-shadow 0.2s;

    &:first-child {
        border-top: none;
    }

    &:hover {
        box-shadow: 0px 0px 15px #b2b2b2;
        border: 1px solid blue !important;
    }
`;
TodoItemDiv.displayName = 'TodoItemDiv';

const LowDiv = styled.div`
    display: grid;
    width: 100%;
    grid-template-rows: 25% 75%;
    grid-template-columns: 5% 50% 30% 10%;
    grid-column-gap: 10px;
    grid-row-gap: 5px;
    grid-template-areas:
        "clock notification-time complete-mark action-btn"
        ". description create-time action-btn";
`;

const ActionButtonDiv = styled.div`
    grid-area: action-btn;
    justify-self: center;
    align-self: center;
`;

const ClockDiv = styled.div`
    grid-area: clock;
    margin-left: 5px;
`;

const DescriptionDiv = styled.div`
    grid-area: description;
    p {
        white-space: pre-wrap;
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
    }
`;

const CreatedTimeDiv = styled.div`
    grid-area: create-time;
    justify-self: end;
    font-size: 12px;
    align-self: end;
`;

const CompleteMarkDiv = styled.div`
    justify-self: end;
    grid-area: complete-mark;
    background-color: #17843c;
    border-radius: 5px;
    color: #fcfcfc;
    padding: 0 5px;
`;