// @flow
import { IpcChannels } from '../channel';

export class TodoDescriptionChangedIPC {
    id: string;
    description: string;
}

export type CloseTodoNoteIpcAction = {
    id: string;
}

export type StickerActions = CreateStickerAction
    | EditStickerAction;

type StickerActionBase = {
    channel: string,
}

export type CreateStickerAction = StickerActionBase & {
    id: string,
    description: string,
}

export function createSticker(id: string, description: string): CreateStickerAction {
    return {
        channel: IpcChannels.createSticker,
        id,
        description,
    };
}

export type EditStickerAction = StickerActionBase & {
    id: string,
    description: string,
}

export function editSticker(id: string, description: string): EditStickerAction {
    return {
        channel: IpcChannels.editSticker,
        id,
        description,
    };
}