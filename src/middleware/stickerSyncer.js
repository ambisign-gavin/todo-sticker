// @flow
import { type Actions, ActionTypes } from '../actions';
import { ipcRenderer } from 'electron';
import { TodoDescriptionChangedIPC } from '../sticker/action';
import type { CloseTodoNoteIpcAction } from '../sticker/action';
import { IpcChannels } from '../sticker/channel';

export function stickerSyncer() {
    return (next: (actions: Actions) => Actions) => (action: Actions) => {
        let returnValue = next(action);
        switch (action.type) {
        case ActionTypes.Edit:
            let ipc: TodoDescriptionChangedIPC = new TodoDescriptionChangedIPC();
            ipc.id = action.todoState.id || '';
            ipc.description = action.todoState.description;
            ipcRenderer.send(IpcChannels.todoDescriptionChanged, ipc);
            break;
        case ActionTypes.Delete:
            let closeTodoNoteIpcAction: CloseTodoNoteIpcAction = {
                id: action.id,
            };
            ipcRenderer.send(IpcChannels.closeTodoNote, closeTodoNoteIpcAction);
            break;
        default:
            break;
        }
        return returnValue;
    };
}