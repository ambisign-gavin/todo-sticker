// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import TodoActionButton from '../../../src/container/todoActionButton';
import { Dropdown, Menu } from 'antd';
import { TodoEditableModal } from '../../../src/component/eventEditModal';
import configureStore from 'redux-mock-store';
import { editTodo, completeTodo, deleteTodo } from '../../../src/actions/todo';
import ConfirmButton from '../../../src/component/confirmButton';
import stickerDispatcher from '../../../src/sticker/dispatcher';

jest.mock('electron', () => {
    let ipcRenderer = {
        send: jest.fn()
    };
    return {
        ipcRenderer
    };
});

describe('TodoActionButton', () => {
    let wrapperContainer: ShallowWrapper;
    let wrapper: ShallowWrapper;
    let store = configureStore()();
    beforeAll(() => {
        wrapperContainer= shallow(
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
                store={store}
            />
        );

        wrapper = wrapperContainer.shallow();
    });

    afterEach(() => {
        store.clearActions();
    });

    it('should render correct with complete and edit features are enabled', () => {
        wrapper.setProps({
            enableEdit: true,
            enableComplete: true,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should dispatch completeTodo', () => {
        let menu = shallow(wrapper.find(Dropdown).prop('overlay'));
        menu.find(Menu.Item).at(0).find(ConfirmButton).prop('config').onOk();
        expect(store.getActions()).toEqual([completeTodo('1')]);
    });

    it('should show editable modal', () => {
        let show = jest.spyOn(TodoEditableModal, 'show');
        let menu = shallow(wrapper.find(Dropdown).prop('overlay'));
        menu.find(Menu.Item).at(1).find('a').at(0).simulate('click');
        expect(show.mock.calls.length).toEqual(1);
    });

    it('should dispatch editTodo', () => {
        let todoState = {
            id: '2',
            dueDatetime: 10,
            description: 'Hello',
            complete: false,
            createTime: 0,
        };
        let show = jest.spyOn(TodoEditableModal, 'show');
        let menu = shallow(wrapper.find(Dropdown).prop('overlay'));
        menu.find(Menu.Item).at(1).find('a').at(0).simulate('click');
        show.mock.calls[0][0].onSave(todoState);
        expect(store.getActions()).toEqual([editTodo(todoState)]);
    });

    it('should execute ipc sender method', () => {
        let dispatch = jest.spyOn(stickerDispatcher, 'dispatch');
        let menu = shallow(wrapper.find(Dropdown).prop('overlay'));
        menu.find(Menu.Item).at(2).find('a').at(0).simulate('click');
        expect(dispatch.mock.calls.length).toEqual(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
            channel: 'createSticker',
            id: '1',
            description: 'Hello!',
        });
    });

    it('should dispatch deleteTodo', () => {
        let menu = shallow(wrapper.find(Dropdown).prop('overlay'));
        menu.find(Menu.Item).at(3).find(ConfirmButton).prop('config').onOk();
        expect(store.getActions()).toEqual([deleteTodo('1')]);
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

});