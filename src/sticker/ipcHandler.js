// @flow
import { ipcMain, BrowserWindow, Electron } from 'electron';
import { IpcChannels } from './channel';
import type { CreateStickerAction, EditStickerAction, DeleteStickerAction } from './action';

declare var __dirname: any;
declare var process: any;

class StickerHandler {

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
        ipcMain.on(IpcChannels.createSticker, this._createNoteAndSendDescription);
        ipcMain.on(IpcChannels.editSticker, this._updateTodoNoteDescription);
        ipcMain.on(IpcChannels.deleteSticker, this._closeTodoNote);
    }

    _createNoteAndSendDescription(event: Electron.event, action: CreateStickerAction) {

        if (this.notes.has(action.id) && this.notes.get(action.id)) {
            let win: BrowserWindow = this.notes.get(action.id);
            win.focus();
            return;
        }

        let win: BrowserWindow = new BrowserWindow(this._windowOptions);

        win.loadURL(`file://${__dirname}/note.html`);

        if (process.env.NODE_ENV === 'development') {
            win.webContents.openDevTools();
        }

        win.webContents.on('dom-ready', () => {
            win.webContents.send(IpcChannels.editSticker, action.description);
        });
        this.notes.set(action.id, win);
        win.on('closed', () => this._removeTodoNotes(action.id));
    }

    _updateTodoNoteDescription(event: Electron.event, action: EditStickerAction) {
        let id = action.id;
        let win: BrowserWindow = this.notes.get(id);
        if (!win) {
            this.notes.delete(id);
            return;
        }
        win.webContents.send(action.channel, action.description);
    }

    _closeTodoNote(event: Electron.event, action: DeleteStickerAction) {
        let win: BrowserWindow = this.notes.get(action.id);
        if (!win) {
            this.notes.delete(action.id);
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

const stickerHandler = new StickerHandler();
export default stickerHandler;