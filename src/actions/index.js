// @flow
import type { TodoState } from '../states';

    
export type Actions =
  | AddAction;

export const ActionTypes = {
    Add: 'add',
    Edit: 'edit'
};

export type AddAction = {
    type: string,
    todoState: TodoState
}

export function addEvent(todoState: TodoState): AddAction {
    return {
        type: ActionTypes.Add,
        todoState
    };
}

export function editEvent(todoState: TodoState): AddAction {
    return {
        type: ActionTypes.Edit,
        todoState
    };
}