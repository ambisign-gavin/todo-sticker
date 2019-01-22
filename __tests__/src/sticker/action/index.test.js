// @flow
import { createSticker } from '../../../../src/sticker/action';

describe('StickerActions', () => {
    it('should correct with createSticker', () => {
        expect(createSticker('id1', 'Hello')).toEqual({
            channel: 'createSticker',
            id: 'id1',
            description: 'Hello'
        });
    });
});