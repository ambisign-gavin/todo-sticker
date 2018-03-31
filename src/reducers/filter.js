// @flow
import type {FilterState} from '../states/index';
import {FilterEnum} from '../constant/index';
import type {FilterActions} from '../actions/filter';

const initialFilter: FilterState = {
    dueDate: FilterEnum.DueDate.all,
};

function filter(state: FilterState = initialFilter, action: FilterActions) {
    switch (action.type) {
    case 'dueDateFilter':
        return {
            ...state,
            dueDate: action.filter
        };
    default:
        return  state;
    }
}

export default filter;
