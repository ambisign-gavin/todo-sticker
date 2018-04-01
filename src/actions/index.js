// @flow
import type { TodoState } from '../states';

export type Actions =
    | AddAction
    | EditAction
    | DeleteAction
    | CompleteAction;

export const ActionTypes = {
    Add: 'add',
    Edit: 'edit',
    Delete: 'delete',
    Complete: 'complete'
};

export type AddAction = {|
    type: 'add',
    todoState: TodoState
|}

export type EditAction = {|
    type: 'edit',
    todoState: TodoState
|}

export type DeleteAction = {|
    type: 'delete',
    id: number
|}

export type CompleteAction = {|
    type: 'complete',
    id: number
|}

export function addEvent(todoState: TodoState): AddAction {
    return {
        type: ActionTypes.Add,
        todoState
    };
}

export function editEvent(todoState: TodoState): EditAction {
    return {
        type: ActionTypes.Edit,
        todoState
    };
}

export function deleteTodo(id: number): DeleteAction {
    return {
        type: ActionTypes.Delete,
        id
    };
}

export function completeTodo(id: number): CompleteAction {
    return {
        type: ActionTypes.Complete,
        id
    };
}
