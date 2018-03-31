// @flow
import type {DueDateFilter} from '../constant/filter';

export type FilterActions =
    | DueDateFilterAction;

export type DueDateFilterAction = {|
    type: 'dueDateFilter',
    filter: DueDateFilter,
|}

export function settingDueDateFilter(dueDateFilter: DueDateFilter): DueDateFilterAction {
    return {
        type: 'dueDateFilter',
        filter: dueDateFilter
    };
}
