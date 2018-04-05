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

        let notifyTime: Date = new Date(timestamp);
        let job: Job = nodeSchedule.scheduleJob(notifyTime, () => {
            new Notification(Translate.tr('Notification from Tips'), {
                body: message
            });
        });
        this.notificationQueue.set(scheduleId, job);
    }

}
