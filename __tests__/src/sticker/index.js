// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { Sticker } from '../../../src/sticker/html';

describe('StickerToolbar', () => {
    let originalPlatform;

    beforeAll(() => {
        originalPlatform = process.platform;
    });

    afterAll(() => {
        Object.defineProperty(process, 'platform', {  
            value: originalPlatform
        });
    });

    it('should render correct when platform is windows', () => {
        Object.defineProperty(process, 'platform', {  
            value: 'win32'
        });
        expect(shallow(<Sticker/>)).toMatchSnapshot();
    });

    it('should not render when platform is mac', () => {
        Object.defineProperty(process, 'platform', {  
            value: 'darwin'
        });
        expect(shallow(<Sticker/>)).toMatchSnapshot();
    });

});