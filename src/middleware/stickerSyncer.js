// @flow
import { type Actions, ActionTypes } from '../actions';
import { ipcRenderer } from 'electron';
import { editSticker } from '../sticker/action';
import type { CloseTodoNoteIpcAction } from '../sticker/action';
import { IpcChannels } from '../sticker/channel';
import stickerDispatcher from '../sticker/dispatcher';

export function stickerSyncer() {
    return (next: (actions: Actions) => Actions) => (action: Actions) => {
        let returnValue = next(action);
        switch (action.type) {
        case ActionTypes.Edit:
            stickerDispatcher.dispatch(editSticker(action.todoState.id || '', action.todoState.description));
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