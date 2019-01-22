// @flow
import stickerHandler from '../../../src/sticker/ipcHandler';
import { ipcRenderer, BrowserWindow } from 'electron';
import AddNote from '../../../src/sticker/action/addNote';
import { TodoDescriptionChangedIPC } from '../../../src/sticker/action';
jest.mock('electron');

describe('stickerHandler wieh add new note', () => {
    let action = {
        channel: 'createSticker',
        id: '123',
        description: 'Hello! Testing now.',
    };
    
    beforeAll(() => {
        stickerHandler.registerListener();
    });

    it('should create note success', () => {
        ipcRenderer.send('createSticker', action);
        expect(stickerHandler.notes.size).toEqual(1);
    });

    it('should send note description channel when browser window dom ready', () => {
        let win: BrowserWindow = stickerHandler.notes.get('123');
        win.webContents.send = jest.fn();
        win.webContents.emit('dom-ready');
        expect(win.webContents.send.mock.calls.length).toEqual(1);
        expect(win.webContents.send.mock.calls[0][0]).toEqual('noteDescriptionSend');
        expect(win.webContents.send.mock.calls[0][1]).toEqual('Hello! Testing now.');
    });

    it('should focus window when add duplicate note', () => {
        let win: BrowserWindow = stickerHandler.notes.get('123');
        win.focus = jest.fn();
        ipcRenderer.send('createSticker', action);
        expect(win.focus.mock.calls.length).toEqual(1);
    });

    it('should remove note from map when browser window closed', () => {
        let win: BrowserWindow = stickerHandler.notes.get('123');
        win.emit('closed');
        expect(stickerHandler.notes.has('123')).toBeFalsy();
    });
});

describe('IpcHandler wieh update note', () => {
    let note = new AddNote();

    beforeAll(() => {
        stickerHandler.registerListener();
        note.id = '123';
        note.noteDescription = 'Hello! Testing now.';
        stickerHandler.notes.set(note.id, new BrowserWindow());
    });

    it('should webContent send new description', () => {
        let win: BrowserWindow = stickerHandler.notes.get(note.id);
        win.webContents.send = jest.fn();

        let action = new TodoDescriptionChangedIPC();
        action.description = 'New desctiptions';
        action.id = note.id;
        ipcRenderer.send('todoDescriptionChanged', action);
        
        expect(win.webContents.send.mock.calls.length).toEqual(1);
        expect(win.webContents.send.mock.calls[0][0]).toEqual('noteDescriptionSend');
        expect(win.webContents.send.mock.calls[0][1]).toEqual(action.description);
    });

    it('should be removed from notes when window is null', () => {
        stickerHandler.notes.set(note.id, null);

        let action = new TodoDescriptionChangedIPC();
        action.description = 'New desctiptions';
        action.id = note.id;
        ipcRenderer.send('todoDescriptionChanged', action);

        expect(stickerHandler.notes.has(note.id)).toBeFalsy();
    });
    
});

describe('stickerHandler wieh delete note', () => {
    let note = new AddNote();

    beforeAll(() => {
        stickerHandler.registerListener();
        note.id = '123';
        note.noteDescription = 'Hello! Testing now.';
        stickerHandler.notes.set(note.id, new BrowserWindow());
    });

    it('should call window destory', () => {
        let win: BrowserWindow = stickerHandler.notes.get(note.id);
        win.destroy = jest.fn();

        ipcRenderer.send('closeTodoNote', {
            id: note.id
        });
        expect(win.destroy.mock.calls.length).toEqual(1);
    });

    it('should be removed from notes when window is null', () => {
        stickerHandler.notes.set(note.id, null);

        ipcRenderer.send('closeTodoNote', {
            id: note.id
        });
        expect(stickerHandler.notes.has(note.id)).toBeFalsy();
    });
    
});