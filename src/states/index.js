// @flow
export type TodoState = {|
    id?: number,
    notificationDate?: number,
    notificationTime?: number,
    description: string
|}

export type FilterState = {|
    dueDate: string
|}

export type AppState = {|
    todos: TodoState[],
    filter: FilterState
|}
