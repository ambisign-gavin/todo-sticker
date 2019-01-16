// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import CompleteTodoButton from '../../../src/component/complteTodoButton/completeTodoButton';
import { Modal } from 'antd';

jest.mock('antd', () => {
    let Modal = {
        confirm: jest.fn(),
    };
    return {
        Modal
    };
});

describe('CompleteTodoButton', () => {
    let wrapper: ShallowWrapper;
    let handleCompleteTodo = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<CompleteTodoButton handleCompleteTodo={handleCompleteTodo} todoId={10} />);
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should excute modal confirm when clicked', () => {
        wrapper.find('a').simulate('click');
        expect(Modal.confirm.mock.calls.length).toEqual(1);
    });

    it('should execute handleCompleteTodo when confirming successfully', () => {
        wrapper.find('a').simulate('click');
        Modal.confirm.mock.calls[0][0].onOk();
        expect(handleCompleteTodo.mock.calls.length).toEqual(1);
        expect(handleCompleteTodo.mock.calls[0][0]).toEqual(10);
    });

});