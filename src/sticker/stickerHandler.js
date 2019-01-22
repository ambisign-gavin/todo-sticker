// @flow
import { ipcMain, BrowserWindow, Electron } from 'electron';
import { IpcChannels } from './channel';
import type { CreateStickerAction, EditStickerAction, DeleteStickerAction } from './action';

declare var __dirname: any;
declare var process: any;

class StickerHandler {

    stickers: Map<string, BrowserWindow>;
    _windowOptions: any = {
        width: 350, 
        height: 300, 
        frame: false, 
        titleBarStyle: 'hidden',
        minWidth: 180,
        minHeight: 150,
    }

    constructor() {
        this.stickers = new Map();
    }

    registerListener() {
        ipcMain.on(IpcChannels.createSticker, this._createStickerAndSendEdit.bind(this));
        ipcMain.on(IpcChannels.editSticker, this._editSticker.bind(this));
        ipcMain.on(IpcChannels.deleteSticker, this._deleteSticker.bind(this));
    }

    _createStickerAndSendEdit(event: Electron.event, action: CreateStickerAction) {

        if (this.stickers.has(action.id) && this.stickers.get(action.id)) {
            let win: BrowserWindow = this.stickers.get(action.id);
            win.focus();
            return;
        }

        let win: BrowserWindow = new BrowserWindow(this._windowOptions);

        win.loadURL(`file://${__dirname}/sticker.html`);

        if (process.env.NODE_ENV === 'development') {
            win.webContents.openDevTools();
        }

        win.webContents.on('dom-ready', () => {
            win.webContents.send(IpcChannels.editSticker, action.description);
        });
        this.stickers.set(action.id, win);
        win.on('closed', () => this._removeStickersById(action.id));
    }

    _editSticker(event: Electron.event, action: EditStickerAction) {
        let id = action.id;
        let win: BrowserWindow = this.stickers.get(id);
        if (!win) {
            this.stickers.delete(id);
            return;
        }
        win.webContents.send(action.channel, action.description);
    }

    _deleteSticker(event: Electron.event, action: DeleteStickerAction) {
        let win: BrowserWindow = this.stickers.get(action.id);
        if (!win) {
            this.stickers.delete(action.id);
            return;
        }
        
        win.destroy();
    }

    _removeStickersById(id: string) {
        if (!this.stickers.has(id)) {
            return;
        }
        this.stickers.delete(id);
    }
}

const stickerHandler = new StickerHandler();
export default stickerHandler;