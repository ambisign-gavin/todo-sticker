// @flow
import configureStore from 'redux-mock-store';
import { notificationSyncer } from '../../../src/middleware/notificationSyncer';
import notifyServer from '../../../src/class/notify/notifyServer';

jest.mock('../../../src/class/notify/notifyServer', () => {
    return {
        addSchedule: jest.fn(),
        updateSchedule: jest.fn(),
        removeSchedule: jest.fn(),
    };
});

describe('ss', () => {
    let store= configureStore([notificationSyncer])({});

    it('should add schedule', () => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(0);
        store.dispatch({
            type: 'add',
            todoState: {
                id: '1',
                dueDatetime: 10,
                description: 'Hello',
                complete: false,
                createTime: 10,
            }
        });
        expect(notifyServer.addSchedule.mock.calls.length).toEqual(1);
        expect(notifyServer.addSchedule.mock.calls[0][0]).toEqual('1');
        expect(notifyServer.addSchedule.mock.calls[0][1]).toEqual(10);
        expect(notifyServer.addSchedule.mock.calls[0][2]).toEqual('Hello');
    });

    it('should not add schedule when the due date is early than now', () => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(10);
        store.dispatch({
            type: 'add',
            todoState: {
                id: '1',
                dueDatetime: 0,
                description: 'Hello',
                complete: false,
                createTime: 10,
            }
        });
        expect(notifyServer.addSchedule.mock.calls.length).toEqual(0);
    });

    it('should update schedule', () => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(0);
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
        expect(notifyServer.updateSchedule.mock.calls.length).toEqual(1);
        expect(notifyServer.updateSchedule.mock.calls[0][0]).toEqual('12');
        expect(notifyServer.updateSchedule.mock.calls[0][1]).toEqual(20);
        expect(notifyServer.updateSchedule.mock.calls[0][2]).toEqual('Hello2');
    });

    it('should not update schedule when the due date is early than now', () => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(10);
        store.dispatch({
            type: 'add',
            todoState: {
                id: '12',
                dueDatetime: 0,
                description: 'Hello2',
                complete: false,
                createTime: 10,
            }
        });
        expect(notifyServer.updateSchedule.mock.calls.length).toEqual(0);
    });

    it('should remove schedule when delete todo', () => {
        store.dispatch({
            type: 'delete',
            id: 't1'
        });
        expect(notifyServer.removeSchedule.mock.calls.length).toEqual(1);
        expect(notifyServer.removeSchedule.mock.calls[0][0]).toEqual('t1');
    });

    it('should remove schedule when complete todo', () => {
        store.dispatch({
            type: 'delete',
            id: 'sge59'
        });
        expect(notifyServer.removeSchedule.mock.calls.length).toEqual(1);
        expect(notifyServer.removeSchedule.mock.calls[0][0]).toEqual('sge59');
    });

});
