// @flow

export type FilterActions =
    | DueDateFilterAction;

export type DueDateFilterAction = {|
    type: 'dueDateFilter',
    filter: string,
|}

export function settingDueDateFilter(dueDateFilter: string): DueDateFilterAction {
    return {
        type: 'dueDateFilter',
        filter: dueDateFilter
    };
}
