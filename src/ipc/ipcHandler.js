// @flow

import { ipcMain, BrowserWindow } from 'electron';
// @flow

import AddNote from './action/addNote';
import url from 'url';
import path from 'path';

declare var __dirname: any;

export default class IpcHandler {
    registerListener() {
        ipcMain.on(AddNote.ipcChannel, (event: any, addNote: AddNote) => {
            console.log(addNote);
            let win: BrowserWindow = new BrowserWindow({width: 800, height: 600});
            win.loadURL(url.format({
                pathname: path.join(__dirname, '/../../dist/note/index.html'),
                protocol: 'file:',
                slashes: true
            }));
            win.show();
        });
    }
}
