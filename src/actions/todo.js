// @flow
import type { TodoState } from '../states';

export type TodoActions = AddAction
    | EditAction
    | DeleteAction
    | CompleteAction;

export const TodoActionTypeEnum = {
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
    id: string
|}

export type CompleteAction = {|
    type: 'complete',
    id: string
|}

export function addTodo(todoState: TodoState): AddAction {
    return {
        type: TodoActionTypeEnum.Add,
        todoState
    };
}

export function editTodo(todoState: TodoState): EditAction {
    return {
        type: TodoActionTypeEnum.Edit,
        todoState
    };
}

export function deleteTodo(id: string): DeleteAction {
    return {
        type: TodoActionTypeEnum.Delete,
        id
    };
}

export function completeTodo(id: string): CompleteAction {
    return {
        type: TodoActionTypeEnum.Complete,
        id
    };
}
