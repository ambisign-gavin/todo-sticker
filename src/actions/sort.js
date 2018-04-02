// @flow
import type {SortByType, SortColumn} from '../constant/sort';

export type SortActions =
    | SortByAction
    | SortColumnAction;

export type SortColumnAction = {|
    type: 'sortColumn',
    column: SortColumn
|};

export type SortByAction = {|
    type: 'sortBy',
    sortBy: SortByType
|};

export function settingSortColumn(column: SortColumn): SortColumnAction {
    return {
        type: 'sortColumn',
        column: column
    };
}
