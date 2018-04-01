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
        return (
            <div>
                <List
                    dataSource={this.props.todoLists}
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
