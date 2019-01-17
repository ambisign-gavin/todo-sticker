// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import NoteDescription from '../../../src/component/note/noteDescription';
import { IpcChannels } from '../../../src/ipc/channel';
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

describe('NodeDescription', () => {
    let wrapper: ShallowWrapper;

    beforeAll(() => {
        wrapper = shallow(
            <NoteDescription/>
        );
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should set description when ipcRenderer send new message', () => {
        ipcRenderer.send(IpcChannels.noteDescriptionSend, '123');
        expect(wrapper.state().description).toEqual('123');
    });

});
