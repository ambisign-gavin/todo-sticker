// @flow
import { type StickerActions } from './action';
import { ipcRenderer } from 'electron';

class Dispatcher {
    dispatch(action: StickerActions) {
        ipcRenderer.send(action.channel, action);
    }
}
const stickerDispatcher = new Dispatcher();

export default stickerDispatcher;