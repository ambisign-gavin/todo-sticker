// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import StickerToolBar from '../../../src/component/stickerToolbar';
import stickerDispatcher from '../../../src/sticker/dispatcher';

describe('StickerToolbar', () => {
    let wrapper: ShallowWrapper;

    beforeAll(() => {
        wrapper = shallow(<StickerToolBar/>);
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should dispatch minimize window action', () => {
        let mockDispatch = jest.spyOn(stickerDispatcher, 'dispatch');
        wrapper.find('ToolButton').at(0).simulate('click');
        expect(mockDispatch.mock.calls.length).toEqual(1);
        expect(mockDispatch.mock.calls[0][0]).toEqual({channel: 'minimizeStickerWindow'});
    });

    it('should dispatch maximize window action', () => {
        let mockDispatch = jest.spyOn(stickerDispatcher, 'dispatch');
        wrapper.find('ToolButton').at(1).simulate('click');
        expect(mockDispatch.mock.calls.length).toEqual(1);
        expect(mockDispatch.mock.calls[0][0]).toEqual({channel: 'maximizeStickerWindow'});
    });

    it('should dispatch close window action', () => {
        let mockDispatch = jest.spyOn(stickerDispatcher, 'dispatch');
        wrapper.find('ToolButton').at(2).simulate('click');
        expect(mockDispatch.mock.calls.length).toEqual(1);
        expect(mockDispatch.mock.calls[0][0]).toEqual({channel: 'closeStickerWindow'});
    });

});