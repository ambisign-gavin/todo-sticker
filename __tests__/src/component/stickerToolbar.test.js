// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import StickerToolBar from '../../../src/component/stickerToolbar';

describe('StickerToolbar', () => {
    let wrapper: ShallowWrapper;

    beforeAll(() => {
        wrapper = shallow(<StickerToolBar/>);
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

});