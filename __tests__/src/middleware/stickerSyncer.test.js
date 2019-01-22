// @flow
import configureStore from 'redux-mock-store';
import { stickerSyncer } from '../../../src/middleware/stickerSyncer';
import { ipcRenderer } from 'electron';
import stickerDispatcher from '../../../src/sticker/dispatcher';

describe('StickerSyncer', () => {
    let store= configureStore([stickerSyncer])({});

    it('should editSticker be dispatched', () => {
        let dispatch = jest.spyOn(stickerDispatcher, 'dispatch');
        store.dispatch({
            type: 'edit',
            todoState: {
                id: '12',
                dueDatetime: 20,
                description: 'Hello2',
                complete: false,
                createTime: 10,
            }
        });
        
        expect(dispatch.mock.calls.length).toEqual(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
            channel: 'editSticker',
            id: '12',
            description: 'Hello2',
        });
    });

    it('should closing sticker be sent', () => {
        let send = jest.spyOn(ipcRenderer, 'send');
        store.dispatch({
            type: 'delete',
            id: 'd56'
        });
        
        expect(send.mock.calls.length).toEqual(1);
        expect(send.mock.calls[0][0]).toEqual('closeTodoNote');
        expect(send.mock.calls[0][1]).toEqual({
            id: 'd56',
        });
    });

});