// @flow
import { ipcMain, BrowserWindow, WebContents, Electron } from 'electron';
import AddNote from './action/addNote';

declare var __dirname: any;

export default class IpcHandler {

    notes: Map<string, WebContents>;
    _createNoteAndSendDescription: Function;

    constructor() {
        this.notes = new Map();
        this._createNoteAndSendDescription = this._createNoteAndSendDescription.bind(this);
    }

    registerListener() {
        ipcMain.on(AddNote.ipcChannel, this._createNoteAndSendDescription);
    }

    _createNoteAndSendDescription(event: Electron.event, addNote: AddNote) {
        let win: BrowserWindow = new BrowserWindow({width: 400, height: 300});
        win.loadURL(`file://${__dirname}/../../dist/note/index.html`);
        win.webContents.openDevTools();

        win.webContents.on('dom-ready', () => {
            win.webContents.send('noteDescription', addNote.noteDescription);
        });
        this.notes.set(addNote.id, win.webContents);
    }
}
