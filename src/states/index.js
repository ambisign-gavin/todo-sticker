// @flow
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';

export type TodoState = {|
    id?: string,
    notificationDate?: number,
    notificationTime?: number,
    description: string,
    complete?: boolean
|}

export type FilterState = {|
    dueDate: DueDateFilter,
    completeStatus: CompleteStatusFilter
|}

export type AppState = {|
    todos: TodoState[],
    filter: FilterState
|}
