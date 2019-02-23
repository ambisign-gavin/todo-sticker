// @flow
import { IpcChannels } from '../channel';

export type StickerActions = CreateStickerAction
    | EditStickerAction
    | DeleteStickerAction
    | CloseStickerWindowAction
    | MaximizeStickerWindowAction
    | MinimizeStickerWindowAction;

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

export type DeleteStickerAction = StickerActionBase & {
    id: string,
}

export function deleteSticker(id: string): DeleteStickerAction {
    return {
        channel: IpcChannels.deleteSticker,
        id,
    };
}

export type CloseStickerWindowAction = StickerActionBase;

export function closeStickerWindow(): CloseStickerWindowAction {
    return {
        channel: IpcChannels.closeStickerWindow
    };
}

export type MaximizeStickerWindowAction = StickerActionBase;

export function maximizeStickerWindow(): MaximizeStickerWindowAction {
    return {
        channel: IpcChannels.maximizeStickerWindow
    };
}

export type MinimizeStickerWindowAction = StickerActionBase;

export function minimizeStickerWindow(): MinimizeStickerWindowAction {
    return {
        channel: IpcChannels.minimizeStickerWindow
    };
}