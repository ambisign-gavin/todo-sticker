// @flow
import type { TodoState } from '../states';

export type Actions =
    | AddAction
    | EditAction
    | DeleteAction;

export const ActionTypes = {
    Add: 'add',
    Edit: 'edit',
    Delete: 'delete'
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
