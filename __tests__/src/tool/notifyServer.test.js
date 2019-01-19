import notifyServer from '../../../src/class/notify/notifyServer';
import nodeSchedule from 'node-schedule';
import Notification from '../../../src/class/notification';

jest.mock('../../../src/class/notification', () => {
    return jest.fn();
});

describe('NotifyServer', () => {

    afterEach(() => {
        notifyServer._notificationQueue.clear();
    });

    it('should add schedule object to map', () => {
        notifyServer.addSchedule('test1', new Date(2019, 1, 20).getTime(), 'Test notification.');
        expect(notifyServer._notificationQueue.size).toEqual(1);
        expect(notifyServer._notificationQueue.has('test1')).toBeTruthy();
    });


    it('should call nodeSchedule when add schedule', () => {
        let scheduleJob = jest.spyOn(nodeSchedule, 'scheduleJob');
        notifyServer.addSchedule('test1', new Date(2019, 1, 20).getTime(), 'Test notification.');
        expect(scheduleJob.mock.calls.length).toEqual(1);
        expect(scheduleJob.mock.calls[0][0]).toEqual(new Date(2019, 1, 20));

        scheduleJob.mock.calls[0][1]();
        expect(Notification.mock.calls.length).toEqual(1);
        expect(Notification.mock.calls[0][1]).toEqual({
            body: 'Test notification.',
        });
    });

    it('should call cancel when added schedule is existed', () => {
        let job = {
            cancel: jest.fn()
        };
        jest.spyOn(nodeSchedule, 'scheduleJob').mockReturnValue(job);
        notifyServer.addSchedule('test1', new Date(2019, 1, 20).getTime(), 'Test notification.');
        notifyServer.addSchedule('test1', new Date(2019, 1, 20).getTime(), 'Test notification.');
        expect(job.cancel.mock.calls.length).toEqual(1);
    });

    it('should add schedulee when updated schedule isnt existed', () => {
        let addSchedule = jest.spyOn(notifyServer, 'addSchedule');
        notifyServer.updateSchedule('test1', new Date(2019, 1, 20).getTime(), 'Test notification.');
        expect(addSchedule.mock.calls.length).toEqual(1);
    });

    it('should cancel job and reschedule job when updated schedule is existed', () => {
        let job = {
            cancel: jest.fn()
        };
        notifyServer._notificationQueue.set('test1', job);
        let scheduleJob = jest.spyOn(nodeSchedule, 'scheduleJob');
        notifyServer.updateSchedule('test1', new Date(2019, 2, 10).getTime(), 'Test notification2.');
        expect(scheduleJob.mock.calls.length).toEqual(1);
        expect(scheduleJob.mock.calls[0][0]).toEqual(new Date(2019, 2, 10));

        scheduleJob.mock.calls[0][1]();
        expect(Notification.mock.calls.length).toEqual(1);
        expect(Notification.mock.calls[0][1]).toEqual({
            body: 'Test notification2.',
        });
    });

    it('should return false when remove schedule not existed', () => {
        expect(notifyServer.removeSchedule('1')).toBeFalsy();
    });

    it('should cancel job and return true when remove schedule success', () => {
        let job = {
            cancel: jest.fn()
        };
        notifyServer._notificationQueue.set('test1', job);
        expect(notifyServer.removeSchedule('test1')).toBeTruthy();
        expect(job.cancel.mock.calls.length).toEqual(1);
    });

});