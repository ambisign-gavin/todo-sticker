// @flow
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';

export type TodoState = {|
    id?: string,
    dueDatetime: number,
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
