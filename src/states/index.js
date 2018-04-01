// @flow
import type {DueDateFilter} from '../constant/filter';

export type TodoState = {|
    id?: string,
    notificationDate?: number,
    notificationTime?: number,
    description: string,
    complete?: boolean
|}

export type FilterState = {|
    dueDate: DueDateFilter
|}

export type AppState = {|
    todos: TodoState[],
    filter: FilterState
|}
