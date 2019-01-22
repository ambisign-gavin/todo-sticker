// @flow

export class TodoDescriptionChangedIPC {
    id: string;
    description: string;
}

export type CloseTodoNoteIpcAction = {
    id: string;
}