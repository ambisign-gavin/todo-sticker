// @flow
import React from 'react';
import { mount, type ShallowWrapper } from 'enzyme';
import TodoList from '../../../src/component/todoList/todoList';
import { type TodoState } from '../../../src/states';
// import createStore from 'antd/lib/table/createStore';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('TodoList', () => {
    let wrapper: ShallowWrapper;

    let todoLists: Array<TodoState> = [
        {
            id: '1',
            dueDatetime: 10,
            description: 'Hello!',
            complete: false,
            createTime: 0,
        },
        {
            id: '2',
            dueDatetime: 123,
            description: 'hi!',
            complete: false,
            createTime: 0,
        },
        {
            id: '3',
            dueDatetime: 0,
            description: 'Hello there!',
            complete: true,
            createTime: 0,
        },
        {
            id: '4',
            dueDatetime: 15,
            description: 'Yo!',
            complete: false,
            createTime: 0,
        },
        {
            id: '5',
            dueDatetime: 10,
            description: 'Good morning!',
            complete: false,
            createTime: 0,
        },
    ];

    beforeAll(() => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(0);
        wrapper = mount(
            <Provider store={configureStore()()}>
                <TodoList
                    todoLists={todoLists}
                />
            </Provider>
        );
    });

    it('should render correct with empty', () => {
        wrapper.setProps({
            todoLists: []
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct with todos', () => {
        expect(wrapper).toMatchSnapshot();
    });

});