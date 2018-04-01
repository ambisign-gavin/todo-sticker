// @flow
import React from 'react';
import { Icon } from 'antd';
import { Menu, Dropdown, Button } from 'antd';
import EditModal from '../../container/editTodoModalContainer';
import Translate from '../../class/translate';
import type {TodoState} from '../../states/index';
import DeleteButtonContainer from '../../container/DeleteButtonContainer';

type Props = {
    todo: TodoState,
}

type States = {
    editModalVisible: boolean,
}

export default class TodoActionButton extends React.Component<Props, States> {

    handleEdit: Function;

    state: States = {
        editModalVisible: false,
    }

    constructor(props: Props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit() {
        this.setState({
            editModalVisible: true
        });
    }

    render() {
        let {
            todo,
            ...others
        } = this.props;

        const menu = (
            <Menu>
                <Menu.Item>
                    <a>Complete</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.handleEdit} >Edit</a>
                </Menu.Item>
                <Menu.Item>
                    <DeleteButtonContainer todoId={todo.id} />
                </Menu.Item>
            </Menu>
        );
        return (
            <div {...others}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button><Icon type="ellipsis" /></Button>
                </Dropdown>
                <EditModal
                    title={Translate.tr('Edit Todo')}
                    visible={this.state.editModalVisible}
                    onSave={() => this.setState({editModalVisible: false})}
                    onCancel={() => this.setState({editModalVisible: false})}
                    todoId={todo.id}
                    defaultDate={todo.notificationDate || new Date().getTime()}
                    defaultTime={todo.notificationTime || new Date().getTime()}
                    defaultDescription={todo.description}
                />
            </div>
        );
    }
}
