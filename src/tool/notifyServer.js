// @flow
import nodeSchedule, { Job } from 'node-schedule';
import Translate from '../class/translate';
import Notification from '../class/notification';

class NotifyServer {
    _notificationQueue: Map<string, Job>;

    constructor() {
        this._notificationQueue = new Map();
    }

    addSchedule(scheduleId: string, timestamp: number, message: string) {

        if (this._notificationQueue.has(scheduleId)) {
            let existJob: Job = this._notificationQueue.get(scheduleId);
            if (existJob) {
                existJob.cancel();
            }
        }

        this._notificationQueue.set(scheduleId, this._generateScheduleJob(timestamp, message));
    }

    updateSchedule(scheduleId: string, timestamp: number, message: string) {

        if (!this._notificationQueue.has(scheduleId)) {
            this.addSchedule(scheduleId, timestamp, message);
        }
        let job: Job = this._notificationQueue.get(scheduleId);
        if (job) {
            job.cancel();
        }

        this._notificationQueue.set(scheduleId, this._generateScheduleJob(timestamp, message));
    }

    removeSchedule(scheduleId: string): boolean {
        if (!this._notificationQueue.has(scheduleId)) {
            return false;
        }
        let job: Job = this._notificationQueue.get(scheduleId);
        if (job) {
            job.cancel();
        }
        this._notificationQueue.delete(scheduleId);
        return true;
    }

    _generateScheduleJob(timestamp: number, message: string): Job {
        let options: NotificationOptions = { };
        options.body = message;
        let job: Job = nodeSchedule.scheduleJob(new Date(timestamp), () => {
            new Notification(Translate.tr('Notification from Todo Sticker'), options);
        });
        return job;
    }

}

const notifyServer = new NotifyServer();
export default notifyServer;