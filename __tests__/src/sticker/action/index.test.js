// @flow
import { createSticker, editSticker, closeStickerWindow, minimizeStickerWindow, maximizeStickerWindow } from '../../../../src/sticker/action';

describe('StickerActions', () => {
    it('should correct with createSticker', () => {
        expect(createSticker('id1', 'Hello')).toEqual({
            channel: 'createSticker',
            id: 'id1',
            description: 'Hello'
        });
    });

    it('should correct with editSticker', () => {
        expect(editSticker('id1', 'Hello')).toEqual({
            channel: 'editSticker',
            id: 'id1',
            description: 'Hello'
        });
    });

    it('should correct with closeStickerWindow', () => {
        expect(closeStickerWindow()).toEqual({
            channel: 'closeStickerWindow',
        });
    });

    it('should correct with minimizeStickerWindow', () => {
        expect(minimizeStickerWindow()).toEqual({
            channel: 'minimizeStickerWindow',
        });
    });

    it('should correct with maximizeStickerWindow', () => {
        expect(maximizeStickerWindow()).toEqual({
            channel: 'maximizeStickerWindow',
        });
    });
});