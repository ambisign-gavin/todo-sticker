// @flow
import React from 'react';
import { List } from 'antd';
import type { EventState } from '../../states';

type Props = {
    todoLists: EventState[]
}

export default class TodoList extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <List
                dataSource={this.props.todoLists}
                renderItem={
                    (item: EventState) => (
                        <List.Item>{item.description}</List.Item>
                    )
                }
            />
        );
    }

}