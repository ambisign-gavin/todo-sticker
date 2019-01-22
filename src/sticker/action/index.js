// @flow
import { IpcChannels } from '../channel';

export class TodoDescriptionChangedIPC {
    id: string;
    description: string;
}

export type CloseTodoNoteIpcAction = {
    id: string;
}

export type StickerActions = CreateStickerAction;

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