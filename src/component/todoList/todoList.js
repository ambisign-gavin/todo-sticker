// @flow
import React from 'react';
import { List, Icon } from 'antd';
import type { EventState } from '../../states';
import './todoList.scss';
import moment from 'moment';

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
                        <List.Item actions={[<a>edit</a>, <a>more</a>]} >
                            <div className="list-row"  >
                                <div className="clock">
                                    <Icon type="clock-circle-o" />
                                </div>
                                <div className="notification-time">
                                    {moment(item.notificationDate).format('YYYY/MM/DD')} - {moment(item.notificationTime).format('HH:mm')}
                                </div>
                                <div className="description">
                                    {item.description}
                                </div>
                            </div>
                        </List.Item>
                    )
                }
            />
        );
    }

}