// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import TodoList from '../../../src/component/todoList';
import { type TodoState } from '../../../src/states';
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
        wrapper = shallow(
            <TodoList
                todos={todoLists}
            />
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

    it('should handle page changed', () => {
        wrapper.find('PaginationRow').simulate('change', 2);
        expect(wrapper.state().page).toEqual(2);
    });

    it('should generate showing todos when page changed', () => {
        wrapper.find('PaginationRow').simulate('change', 2);
        expect(wrapper.find('todoList__ListRow').prop('dataSource')).toEqual([
            todoLists[3],
            todoLists[4],
        ]);
    });

    it('should auto change to last page when todos moved', () => {
        expect(wrapper.state().page).toEqual(2);
        wrapper.setProps({
            todos: [
                todoLists[0],
                todoLists[1],
                todoLists[2],
            ]
        });
        expect(wrapper.state().page).toEqual(1);
    });

});