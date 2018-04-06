// @flow
import nodeSchedule, { Job } from 'node-schedule';
import Translate from '../translate';

declare var Notification: any; //html notification api

export default class NotifyServer {
    _notificationQueue: Map<string, Job>;
    static instance: NotifyServer = new NotifyServer();

    constructor() {
        this._notificationQueue = new Map();
    }

    addSchedule(scheduleId: string, timestamp: number, message: string) {

        if (this._notificationQueue.has(scheduleId)) {
            let existJob: Job = this._notificationQueue.get(scheduleId);
            existJob.cancel();
        }

        this._notificationQueue.set(scheduleId, this._generateScheduleJob(timestamp, message));
    }

    updateSchedule(scheduleId: string, timestamp: number, message: string) {

        if (!this._notificationQueue.has(scheduleId)) {
            this.addSchedule(scheduleId, timestamp, message);
        }
        let job: Job = this._notificationQueue.get(scheduleId);
        job.cancel();

        this._notificationQueue.set(scheduleId, this._generateScheduleJob(timestamp, message));
    }

    removeSchedule(scheduleId: string): boolean {
        if (this._notificationQueue.has(scheduleId)) {
            return this._notificationQueue.delete(scheduleId);
        }
        return false;
    }

    _generateScheduleJob(timestamp: number, message: string): Job {
        let job: Job = nodeSchedule.scheduleJob(new Date(timestamp), () => {
            new Notification(Translate.tr('Notification from Tips'), {
                body: message
            });
        });
        return job;
    }

}
