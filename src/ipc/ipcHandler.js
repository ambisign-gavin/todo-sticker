// @flow
import { ipcMain, BrowserWindow, WebContents, Electron } from 'electron';
import AddNote from './action/addNote';
import { IpcChannels } from './channel';
import { TodoDescriptionChangedIPC } from './action';

declare var __dirname: any;

export default class IpcHandler {

    notes: Map<string, WebContents>;
    _createNoteAndSendDescription: Function;
    _updateTodoNoteDescription: Function;

    constructor() {
        this.notes = new Map();
        this._createNoteAndSendDescription = this._createNoteAndSendDescription.bind(this);
        this._updateTodoNoteDescription = this._updateTodoNoteDescription.bind(this);
    }

    registerListener() {
        ipcMain.on(AddNote.ipcChannel, this._createNoteAndSendDescription);
        ipcMain.on(IpcChannels.todoDescriptionChanged, this._updateTodoNoteDescription);
    }

    _createNoteAndSendDescription(event: Electron.event, addNote: AddNote) {
        let win: BrowserWindow = new BrowserWindow({width: 400, height: 300});
        win.loadURL(`file://${__dirname}/../../dist/note/index.html`);
        win.webContents.openDevTools();

        win.webContents.on('dom-ready', () => {
            win.webContents.send(IpcChannels.noteDescriptionSend, addNote.noteDescription);
        });
        this.notes.set(addNote.id, win.webContents);
    }

    _updateTodoNoteDescription(event: Electron.event, container: TodoDescriptionChangedIPC) {
        let id = container.id;
        let webContents: WebContents = this.notes.get(id);
        if (!webContents) {
            return;
        }
        webContents.send(IpcChannels.noteDescriptionSend, container.description);
    }
}
