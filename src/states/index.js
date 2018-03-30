// @flow
export type TodoState = {|
    id?: number,
    notificationDate?: number,
    notificationTime?: number,
    description: string
|}

export type AppState = {
    todos: TodoState[]
}
