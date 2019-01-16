// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import { Modal } from 'antd';
import DeleteTodoButton from '../../../src/component/deleteButton/deleteButton';

jest.mock('antd', () => {
    let Modal = {
        confirm: jest.fn(),
    };
    return {
        Modal
    };
});

describe('DeleteTodoButton', () => {
    let wrapper: ShallowWrapper;
    let handleDeleteTodo = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<DeleteTodoButton handleDeleteTodo={handleDeleteTodo} todoId={10} />);
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should excute modal confirm when clicked', () => {
        wrapper.find('a').simulate('click');
        expect(Modal.confirm.mock.calls.length).toEqual(1);
    });

    it('should execute handleDeleteTodo when confirming successfully', () => {
        wrapper.find('a').simulate('click');
        Modal.confirm.mock.calls[0][0].onOk();
        expect(handleDeleteTodo.mock.calls.length).toEqual(1);
        expect(handleDeleteTodo.mock.calls[0][0]).toEqual(10);
    });

});