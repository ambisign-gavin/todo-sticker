// @flow
import type {Actions, EditAction, DeleteAction, CompleteAction} from '../actions';
import type {TodoState} from '../states';
import {ActionTypes} from '../actions';
import { ipcRenderer } from 'electron';
import { TodoDescriptionChangedIPC } from '../ipc/action';
import type { CloseTodoNoteIpcAction } from '../ipc/action';
import { IpcChannels } from '../ipc/channel';

function todos(state: TodoState[] = [], action: Actions): Array<TodoState> {

    switch (action.type) {
    case ActionTypes.Add:
        
        return ([
            ...state,
            action.todoState
        ]);

    case ActionTypes.Edit:
        let editAction: EditAction = action;
        
        let ipc: TodoDescriptionChangedIPC = new TodoDescriptionChangedIPC();
        ipc.id = editAction.todoState.id || '';
        ipc.description = editAction.todoState.description;
        ipcRenderer.send(IpcChannels.todoDescriptionChanged, ipc);

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

        return state.filter(todoState => todoState.id !== deleteAction.id);

    case ActionTypes.Complete:
        let completeAction: CompleteAction = action;
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
