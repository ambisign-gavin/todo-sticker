// @flow
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';

export type FilterActions =
    | DueDateFilterAction
    | CompleteStatusFilterAction;

export type DueDateFilterAction = {|
    type: 'dueDateFilter',
    filter: DueDateFilter,
|}

export type CompleteStatusFilterAction = {|
    type: 'completeStatusFilter',
    filter: CompleteStatusFilter,
|}

export function settingDueDateFilter(dueDateFilter: DueDateFilter): DueDateFilterAction {
    return {
        type: 'dueDateFilter',
        filter: dueDateFilter
    };
}

export function settingCompleteStatusFilter(completeStatusFilter: CompleteStatusFilter): CompleteStatusFilterAction {
    return {
        type: 'completeStatusFilter',
        filter: completeStatusFilter
    };
}
