// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import TodosPage from '../../../src/container/todosPage';
import { TodoEditableModal } from '../../../src/component/eventEditModal';
import configureStore from 'redux-mock-store';
import { addTodo } from '../../../src/actions';
import { Button } from 'antd';
import FilterPanel from '../../../src/container/filterPanel';

describe('TodosPage', () => {
    let wrapperContainer: ShallowWrapper;
    let wrapper: ShallowWrapper;
    let store = configureStore()();

    beforeAll(() => {
        wrapperContainer = shallow(
            <TodosPage 
                store={store}
            />
        );
        wrapper = wrapperContainer.shallow();
    });

    it('should render correct', () => {
        expect(wrapperContainer).toMatchSnapshot();
    });

    it('should render correct with origin component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should show filter panel', () => {
        wrapper.find(Button).simulate('click');
        expect(wrapper.state().showFilterPanel).toBeTruthy();
    });

    it('should hide filter panel', () => {
        wrapper.find(FilterPanel).simulate('hide');
        expect(wrapper.state().showFilterPanel).toBeFalsy();
    });

    it('should show editable modal', () => {
        let show = jest.spyOn(TodoEditableModal, 'show');
        wrapper.find('AddButton').simulate('click');
        expect(show.mock.calls.length).toEqual(1);
    });

    it('should call addTodo', () => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(10);
        let todoState = {
            dueDatetime: 0,
            description: 'Hello',
        };
        let show = jest.spyOn(TodoEditableModal, 'show');
        wrapper.find('AddButton').simulate('click');
        show.mock.calls[0][0].onSave(todoState);
        expect(store.getActions()).toEqual([addTodo({
            id: '1',
            dueDatetime: 0,
            description: 'Hello',
            complete: false,
            createTime: 10,
        })]);
    });

});
