// @flow
import type {FilterState} from '../states/index';
import {DueDateFilterEnum, CompleteStatusFilterEnum} from '../constant/filter';
import type {FilterActions} from '../actions/filter';

const initialFilter: FilterState = {
    dueDate: DueDateFilterEnum.all,
    completeStatus: CompleteStatusFilterEnum.all
};

function filter(state: FilterState = initialFilter, action: FilterActions) {
    switch (action.type) {
    case 'dueDateFilter':
        return {
            ...state,
            dueDate: action.filter
        };
    case 'completeStatusFilter':
        return {
            ...state,
            completeStatus: action.filter
        };
    default:
        return  state;
    }
}

export default filter;
