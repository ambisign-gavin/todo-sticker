// @flow
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';
import type {SortByType, SortColumn} from '../constant/sort';

export type TodoState = {|
    id?: string,
    dueDatetime: number,
    description: string,
    complete?: boolean,
    createTime?: number,
|}

export type FilterState = {|
    dueDate: DueDateFilter,
    completeStatus: CompleteStatusFilter
|}

export type SortState = {
    sortBy: SortByType,
    sortColumn: SortColumn
}

export type AppState = {|
    todos: TodoState[],
    filter: FilterState,
    sort: SortState,
|}
