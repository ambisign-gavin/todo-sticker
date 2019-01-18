// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import TodoActionButton from '../../../src/component/todoActionButton';
import { Dropdown, Menu } from 'antd';
import { ipcRenderer } from 'electron';

jest.mock('electron', () => {
    let ipcRenderer = {
        send: jest.fn()
    };
    return {
        ipcRenderer
    };
});

describe('TodoActionButton', () => {
    let wrapper: ShallowWrapper;

    beforeAll(() => {
        wrapper= shallow(
            <TodoActionButton
                todo={{
                    id: '1',
                    dueDatetime: 10,
                    description: 'Hello!',
                    complete: false,
                    createTime: 0,
                }}
                enableEdit={true}
                enableComplete={true}
            />
        );
    });

    it('should render correct with complete and edit features are enabled', () => {
        wrapper.setProps({
            enableEdit: true,
            enableComplete: true,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct with complete feature is enabled', () => {
        wrapper.setProps({
            enableEdit: false,
            enableComplete: true,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct with edit feature is enabled', () => {
        wrapper.setProps({
            enableEdit: true,
            enableComplete: false,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct with complete and edit features are disabled', () => {
        wrapper.setProps({
            enableEdit: false,
            enableComplete: false,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should execute ipc sender method', () => {
        let menu = shallow(wrapper.find(Dropdown).prop('overlay'));
        menu.find(Menu.Item).at(0).find('a').at(0).simulate('click');
        expect(ipcRenderer.send.mock.calls.length).toEqual(1);
        expect(ipcRenderer.send.mock.calls[0][0]).toEqual('addNote');
        expect(ipcRenderer.send.mock.calls[0][1]).toEqual({
            id: '1',
            noteDescription: 'Hello!',
        });
    });

});