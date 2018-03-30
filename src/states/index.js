// @flow
export type EventState = {
    id?: number,
    notificationDate?: number,
    notificationTime?: number,
    description: string
}

export type AppState = {
    events: EventState[]
}