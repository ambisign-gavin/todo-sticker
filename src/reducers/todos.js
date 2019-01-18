// @flow
import type {Actions, EditAction, DeleteAction, CompleteAction} from '../actions';
import type {TodoState} from '../states';
import {ActionTypes} from '../actions';
import uniqid from 'uniqid';
import NotifyServer from '../class/notify/notifyServer';
import { ipcRenderer } from 'electron';
import { TodoDescriptionChangedIPC } from '../ipc/action';
import type { CloseTodoNoteIpcAction } from '../ipc/action';
import { IpcChannels } from '../ipc/channel';

function todos(state: TodoState[] = [], action: Actions): Array<TodoState> {

    switch (action.type) {
    case ActionTypes.Add:
        let newTodo: TodoState = {
            id: uniqid(),
            description: action.todoState.description,
            dueDatetime: action.todoState.dueDatetime,
            complete: false,
            createTime: new Date().getTime(),
        };

        if (action.todoState.dueDatetime > new Date().getTime()) {
            NotifyServer.instance.addSchedule(newTodo.id || '', newTodo.dueDatetime, newTodo.description);
        }
        
        return ([
            ...state,
            newTodo
        ]);

    case ActionTypes.Edit:
        let editAction: EditAction = action;
        
        let ipc: TodoDescriptionChangedIPC = new TodoDescriptionChangedIPC();
        ipc.id = editAction.todoState.id || '';
        ipc.description = editAction.todoState.description;
        ipcRenderer.send(IpcChannels.todoDescriptionChanged, ipc);
        
        NotifyServer.instance.removeSchedule(editAction.todoState.id || '');
        if (editAction.todoState.dueDatetime > new Date().getTime()) {
            NotifyServer.instance.addSchedule(
                (editAction.todoState.id || ''),
                editAction.todoState.dueDatetime,
                editAction.todoState.description
            );
        }

        return (
            state.map( todoState => {
                if (todoState.id == editAction.todoState.id) {
                    return {
                        ...todoState,
                        ...editAction.todoState
                    };
                }
                return todoState;
            })
        );

    case ActionTypes.Delete:
        let deleteAction: DeleteAction = action;

        let closeTodoNoteIpcAction: CloseTodoNoteIpcAction = {
            id: deleteAction.id,
        };
        ipcRenderer.send(IpcChannels.closeTodoNote, closeTodoNoteIpcAction);
        
        NotifyServer.instance.removeSchedule(deleteAction.id);

        return state.filter(todoState => todoState.id !== deleteAction.id);

    case ActionTypes.Complete:
        let completeAction: CompleteAction = action;
        NotifyServer.instance.removeSchedule(completeAction.id);
        return (
            state.map( todoState => {
                if (todoState.id === completeAction.id) {
                    return {
                        ...todoState,
                        complete: true
                    };
                }
                return todoState;
            })
        );
    default:
        return state;
    }
}

export default todos;
