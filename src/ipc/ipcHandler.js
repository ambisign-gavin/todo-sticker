// @flow

import { ipcMain, BrowserWindow } from 'electron';
import AddNote from './action/addNote';

export default class IpcHandler {
    registerListener() {
        ipcMain.on(AddNote.ipcChannel, (event: any, addNote: AddNote) => {
            console.log(addNote);
            let win: BrowserWindow = new BrowserWindow({width: 800, height: 600});
            win.show();
        });
    }
}
