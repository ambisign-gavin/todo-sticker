// @flow
import React from 'react';
import { Icon } from 'antd';
import { Menu, Dropdown, Button } from 'antd';
import Translate from '../class/translate';
import type {TodoState} from '../states/index';
import DeleteButtonContainer from './deleteButtonContainer';
import { ipcRenderer } from 'electron';
import AddNote from '../ipc/action/addNote';
import { TodoEditableModal } from '../component/eventEditModal';
import { connect } from 'react-redux';
import { editTodo, completeTodo } from '../actions';
import ConfirmButton from '../component/confirmButton';

type Props = {
    todo: TodoState,
    enableEdit?: boolean,
    enableComplete?: boolean,
    editTodo: (todoState: TodoState) => void,
    completeTodo: (id: string) => void,
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
            completeTodo,
            ...others
        } = this.props;

        const menu = (
            <Menu>
                {enableComplete? (
                    <Menu.Item>
                        <ConfirmButton
                            config={{
                                title: Translate.tr('Are you sure complete this todo?'),
                                okText: Translate.tr('Complete'),
                                cancelText: Translate.tr('No'),
                                onOk: () => { 
                                    completeTodo(todo.id || '');
                                    return Promise.resolve();
                                }
                            }}
                        >
                            {Translate.tr('Complete')}
                        </ConfirmButton>
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
    editTodo,
    completeTodo
};

export default connect(
    null,
    mapDispatchToProps
)(TodoActionButton);