// @flow
import { createSticker, editSticker } from '../../../../src/sticker/action';

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
});