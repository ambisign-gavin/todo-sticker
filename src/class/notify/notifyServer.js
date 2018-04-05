// @flow
import nodeSchedule, { Job } from 'node-schedule';
import Translate from '../translate';

declare var Notification: any; //html notification api

export default class NotifyServer {
    notificationQueue: Map<string, Job>;
    static instance: NotifyServer = new NotifyServer();

    constructor() {
        this.notificationQueue = new Map();
    }

    addSchedule(scheduleId: string, timestamp: number, message: string) {

        if (this.notificationQueue.has(scheduleId)) {
            let existJob: Job = this.notificationQueue.get(scheduleId);
            existJob.cancel();
        }

        this.notificationQueue.set(scheduleId, this.generateScheduleJob(timestamp, message));
    }

    updateSchedule(scheduleId: string, timestamp: number, message: string) {

        if (!this.notificationQueue.has(scheduleId)) {
            this.addSchedule(scheduleId, timestamp, message);
        }
        let job: Job = this.notificationQueue.get(scheduleId);
        job.cancel();

        this.notificationQueue.set(scheduleId, this.generateScheduleJob(timestamp, message));
    }

    generateScheduleJob(timestamp: number, message: string): Job {
        let job: Job = nodeSchedule.scheduleJob(new Date(timestamp), () => {
            new Notification(Translate.tr('Notification from Tips'), {
                body: message
            });
        });
        return job;
    }

}
