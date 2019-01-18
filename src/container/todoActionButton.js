// @flow
import React from 'react';
import { Icon } from 'antd';
import { Menu, Dropdown, Button } from 'antd';
import Translate from '../class/translate';
import type {TodoState} from '../states/index';
import DeleteButtonContainer from './deleteButtonContainer';
import CompleteTodoButtonContainer from './completeTodoButtonContainer';
import { ipcRenderer } from 'electron';
import AddNote from '../ipc/action/addNote';
import { TodoEditableModal } from '../component/eventEditModal';
import { connect } from 'react-redux';
import { editTodo } from '../actions';

type Props = {
    todo: TodoState,
    enableEdit?: boolean,
    enableComplete?: boolean,
    editTodo: (todoState: TodoState) => void,
}

type States = {
    editModalVisible: boolean,
}

class TodoActionButton extends React.Component<Props, States> {

    state: States = {
        editModalVisible: false,
    }

    constructor(props: Props) {
        super(props);
    }

    handleEdit() {
        TodoEditableModal.show({
            title: Translate.tr('Edit Todo'),
            todoState: this.props.todo,
            onSave: this.props.editTodo
        });
    }

    handleAddNote() {
        let addNote: AddNote = new AddNote();
        addNote.noteDescription = this.props.todo.description;
        addNote.id = this.props.todo.id || '';
        ipcRenderer.send(AddNote.ipcChannel, addNote);
    }

    render() {
        let {
            todo,
            enableComplete,
            enableEdit,
            editTodo,
            ...others
        } = this.props;

        const menu = (
            <Menu>
                {enableComplete? (
                    <Menu.Item>
                        <CompleteTodoButtonContainer todoId={todo.id} />
                    </Menu.Item>
                ): null}

                {enableEdit? (
                    <Menu.Item>
                        <a onClick={this.handleEdit.bind(this)} >Edit</a>
                    </Menu.Item>
                ): null}

                <Menu.Item>
                    <a onClick={this.handleAddNote.bind(this)} >Add Note</a>
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
            </div>
        );
    }
}

const mapDispatchToProps = {
    editTodo
};

export default connect(
    null,
    mapDispatchToProps
)(TodoActionButton);