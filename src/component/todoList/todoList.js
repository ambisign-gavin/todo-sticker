// @flow
import React from 'react';
import { List } from 'antd';
import type { TodoState } from '../../states';
import './todoList.scss';
import TodoItem from '../todoItem/todoItem';

type Props = {
    todoLists: TodoState[]
}


export default class TodoList extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        let pagination = {
            pageSize: 10,
            current: 1,
            total: this.props.todoLists.length,
            simple: true
        };
        return (
            <div>
                <List
                    dataSource={this.props.todoLists}
                    pagination={pagination}
                    renderItem={
                        (todo: TodoState) => (
                            <TodoItem todo={todo} />
                        )
                    }
                />
            </div>
        );
    }

}
