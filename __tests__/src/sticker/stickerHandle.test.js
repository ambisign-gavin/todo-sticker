// @flow
import stickerHandler from '../../../src/sticker/stickerHandler';
import { ipcRenderer, BrowserWindow } from 'electron';
jest.mock('electron');

describe('stickerHandler with create sticker', () => {
    let action = {
        channel: 'createSticker',
        id: '123',
        description: 'Hello! Testing now.',
    };
    
    beforeAll(() => {
        stickerHandler.registerListener();
    });

    it('should create sticker success', () => {
        ipcRenderer.send('createSticker', action);
        expect(stickerHandler.stickers.size).toEqual(1);
    });

    it('should editSticker channel when browser window dom ready', () => {
        let win: BrowserWindow = stickerHandler.stickers.get('123');
        win.webContents.send = jest.fn();
        win.webContents.emit('dom-ready');
        expect(win.webContents.send.mock.calls.length).toEqual(1);
        expect(win.webContents.send.mock.calls[0][0]).toEqual('editSticker');
        expect(win.webContents.send.mock.calls[0][1]).toEqual('Hello! Testing now.');
    });

    it('should focus window when create duplicate sticker', () => {
        let win: BrowserWindow = stickerHandler.stickers.get('123');
        win.focus = jest.fn();
        ipcRenderer.send('createSticker', action);
        expect(win.focus.mock.calls.length).toEqual(1);
    });

    it('should remove sticker from map when browser window closed', () => {
        let win: BrowserWindow = stickerHandler.stickers.get('123');
        win.emit('closed');
        expect(stickerHandler.stickers.has('123')).toBeFalsy();
    });
});

describe('stickerHandler with edit sticker', () => {
    let action = {
        channel: 'editSticker',
        id: '123',
        description: 'Hello! Testing now.'
    };

    beforeAll(() => {
        stickerHandler.registerListener();
        stickerHandler.stickers.set(action.id, new BrowserWindow());
    });

    it('should webContent send new description', () => {
        let win: BrowserWindow = stickerHandler.stickers.get(action.id);
        win.webContents.send = jest.fn();

        ipcRenderer.send('editSticker', {
            channel: 'editSticker',
            id: action.id,
            description: 'New desctiptions'
        });
        
        expect(win.webContents.send.mock.calls.length).toEqual(1);
        expect(win.webContents.send.mock.calls[0][0]).toEqual('editSticker');
        expect(win.webContents.send.mock.calls[0][1]).toEqual('New desctiptions');
    });

    it('should be removed from stickers when window is null', () => {
        stickerHandler.stickers.set(action.id, null);

        ipcRenderer.send('editSticker', {
            channel: 'editSticker',
            id: action.id,
            description: 'New desctiptions'
        });

        expect(stickerHandler.stickers.has(action.id)).toBeFalsy();
    });
    
});

describe('stickerHandler with delete sticker', () => {
    let id = '12';

    beforeAll(() => {
        stickerHandler.registerListener();
        stickerHandler.stickers.set(id, new BrowserWindow());
    });

    it('should call window destory', () => {
        let win: BrowserWindow = stickerHandler.stickers.get(id);
        win.destroy = jest.fn();

        ipcRenderer.send('deleteSticker', {
            id
        });
        expect(win.destroy.mock.calls.length).toEqual(1);
    });

    it('should be removed from stickers when window is null', () => {
        stickerHandler.stickers.set(id, null);

        ipcRenderer.send('deleteSticker', {
            id: id
        });
        expect(stickerHandler.stickers.has(id)).toBeFalsy();
    });
    
});