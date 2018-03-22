// @flow

export type EventsState = {
    id: number,
    description: string,
    notificationTime?: ?Date
}
    
export type Actions =
  | AddAction;

export const ActionTypes = {
    Add: "add",
}

export type AddAction = {
    type: string,
    description: string,
    notificationTime: ?Date
}

export function addEvent(description: string, notificationTime: ?Date): AddAction {
    return {
        type: ActionTypes.Add,
        description,
        notificationTime
    }
}