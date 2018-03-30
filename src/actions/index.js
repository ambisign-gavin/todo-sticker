// @flow
import type { EventState } from '../states';

    
export type Actions =
  | AddAction;

export const ActionTypes = {
    Add: 'add',
    Edit: 'edit'
};

export type AddAction = {
    type: string,
    eventState: EventState
}

export function addEvent(eventState: EventState): AddAction {
    return {
        type: ActionTypes.Add,
        eventState
    };
}

export function editEvent(eventState: EventState): AddAction {
    return {
        type: ActionTypes.Edit,
        eventState
    };
}