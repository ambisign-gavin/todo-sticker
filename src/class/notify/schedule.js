// @flow

export default class Schedule {
    timestamp: number;
    message: string;
    constructor(timestamp: number, message: string) {
        this.timestamp = timestamp;
        this.message = message;
    }

}
