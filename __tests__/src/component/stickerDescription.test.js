// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import StickerDescription from '../../../src/component/stickerDescription';
import { IpcChannels } from '../../../src/sticker/channel';
import { ipcRenderer } from 'electron';

jest.mock('electron', () => {
    let _listener;
    let ipcRenderer = {
        on: (channel: string, listener: Function) => {
            _listener = listener;
        },
        send: (channel: string, message: string) => {
            _listener({}, message);
        }
    };
    return {
        ipcRenderer,
    };
});

describe('StickerDescription', () => {
    let wrapper: ShallowWrapper;

    beforeAll(() => {
        wrapper = shallow(
            <StickerDescription/>
        );
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should set description when ipcRenderer send new message', () => {
        ipcRenderer.send(IpcChannels.editSticker, '123');
        expect(wrapper.state().description).toEqual('123');
    });

});
