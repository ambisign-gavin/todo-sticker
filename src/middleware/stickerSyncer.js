// @flow
import { type Actions } from '../actions';
import { editSticker, deleteSticker } from '../sticker/action';
import stickerDispatcher from '../sticker/dispatcher';
import { TodoActionTypeEnum } from '../actions/todo';

export function stickerSyncer() {
    return (next: (actions: Actions) => Actions) => (action: Actions) => {
        let returnValue = next(action);
        switch (action.type) {
        case TodoActionTypeEnum.Edit:
            stickerDispatcher.dispatch(editSticker(action.todoState.id || '', action.todoState.description));
            break;
        case TodoActionTypeEnum.Delete:
            stickerDispatcher.dispatch(deleteSticker(action.id));
            break;
        default:
            break;
        }
        return returnValue;
    };
}