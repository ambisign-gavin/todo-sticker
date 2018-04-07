// @flow
import { ipcMain, BrowserWindow, Electron } from 'electron';
import AddNote from './action/addNote';
import { IpcChannels } from './channel';
import { TodoDescriptionChangedIPC } from './action';
import type { CloseTodoNoteIpcAction } from './action';

declare var __dirname: any;

export default class IpcHandler {

    notes: Map<string, BrowserWindow>;
    _createNoteAndSendDescription: Function;
    _updateTodoNoteDescription: Function;
    _closeTodoNote: Function;
    _windowOptions: any = {
        width: 350, 
        height: 300, 
        frame: false, 
        titleBarStyle: 'hidden',
        minWidth: 180,
        minHeight: 150,
    }

    constructor() {
        this.notes = new Map();
        this._createNoteAndSendDescription = this._createNoteAndSendDescription.bind(this);
        this._updateTodoNoteDescription = this._updateTodoNoteDescription.bind(this);
        this._closeTodoNote = this._closeTodoNote.bind(this);
    }

    registerListener() {
        ipcMain.on(AddNote.ipcChannel, this._createNoteAndSendDescription);
        ipcMain.on(IpcChannels.todoDescriptionChanged, this._updateTodoNoteDescription);
        ipcMain.on(IpcChannels.closeTodoNote, this._closeTodoNote);
    }

    _createNoteAndSendDescription(event: Electron.event, addNote: AddNote) {

        if (this.notes.has(addNote.id) && this.notes.get(addNote.id)) {
            let win: BrowserWindow = this.notes.get(addNote.id);
            win.focus();
            return;
        }

        let win: BrowserWindow = new BrowserWindow(this._windowOptions);
        win.loadURL(`file://${__dirname}/../../dist/note/index.html`);
        win.webContents.openDevTools();

        win.webContents.on('dom-ready', () => {
            win.webContents.send(IpcChannels.noteDescriptionSend, addNote.noteDescription);
        });
        this.notes.set(addNote.id, win);
        win.on('closed', () => this._removeTodoNotes(addNote.id));
    }

    _updateTodoNoteDescription(event: Electron.event, container: TodoDescriptionChangedIPC) {
        let id = container.id;
        let win: BrowserWindow = this.notes.get(id);
        if (!win) {
            this.notes.delete(id);
            return;
        }
        win.webContents.send(IpcChannels.noteDescriptionSend, container.description);
    }

    _closeTodoNote(event: Electron.event, closeTodoNoteIpcAction: CloseTodoNoteIpcAction) {
        let win: BrowserWindow = this.notes.get(closeTodoNoteIpcAction.id);
        if (!win) {
            this.notes.delete(closeTodoNoteIpcAction.id);
            return;
        }
        
        win.destroy();
    }

    _removeTodoNotes(id: string) {
        if (!this.notes.has(id)) {
            return;
        }
        this.notes.delete(id);
    }
}
