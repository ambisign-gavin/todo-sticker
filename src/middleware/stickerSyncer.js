// @flow
import { type Actions, ActionTypes } from '../actions';
import { editSticker, deleteSticker } from '../sticker/action';
import stickerDispatcher from '../sticker/dispatcher';

export function stickerSyncer() {
    return (next: (actions: Actions) => Actions) => (action: Actions) => {
        let returnValue = next(action);
        switch (action.type) {
        case ActionTypes.Edit:
            stickerDispatcher.dispatch(editSticker(action.todoState.id || '', action.todoState.description));
            break;
        case ActionTypes.Delete:
            stickerDispatcher.dispatch(deleteSticker(action.id));
            break;
        default:
            break;
        }
        return returnValue;
    };
}