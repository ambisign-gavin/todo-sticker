// @flow
import type {SortState} from '../states/index';
import {SortByTypeEnum, SortColumnEnum} from '../constant/sort';
import type {SortActions} from '../actions/sort';

const initState: SortState = {
    sortBy: SortByTypeEnum.asc,
    sortColumn: SortColumnEnum.dueDate
};

export default function sort(sortState: SortState = initState, action: SortActions): SortState {
    switch (action.type) {
    case 'sortColumn':
        return {
            ...sortState,
            sortColumn: action.column
        };
    case 'sortBy':
        return {
            ...sortState,
            sortBy: action.sortBy
        };
    default:
        return sortState;
    }
}
