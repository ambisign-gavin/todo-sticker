// @flow
import type { EventState } from '../states';

    
export type Actions =
  | AddAction;

export const ActionTypes = {
    Add: 'add',
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