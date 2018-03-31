// @flow
import type {DueDateFilter} from '../constant/filter';

export type TodoState = {|
    id?: number,
    notificationDate?: number,
    notificationTime?: number,
    description: string
|}

export type FilterState = {|
    dueDate: DueDateFilter
|}

export type AppState = {|
    todos: TodoState[],
    filter: FilterState
|}
