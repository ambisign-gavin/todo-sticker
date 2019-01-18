// @flow
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AddButton from '../../../src/component/addButton';
import AddModal from '../../../src/container/addTodoModalContainer';

describe('AddButton', () => {
    let wrapper: ShallowWrapper;

    beforeAll(() => {
        global.Date.prototype.getTime = jest.fn().mockReturnValue(0);
        wrapper = shallow(<AddButton/>);
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should change color when hover', () => {
        expect(wrapper.find('AddButtonIcon')).toHaveStyleRule('color', '#6494c4',{
            modifier: ':hover',
        });
    });

    it('should show add modal and setting time', () => {
        wrapper.find('AddButtonIcon').simulate('click');
        expect(wrapper.state().showEditModal).toBeTruthy();
        expect(wrapper.state().defaultTimestamp).toEqual(0);
    });

    it('should hide add modal when it save triggered', () => {
        wrapper.find(AddModal).at(0).simulate('save');
        expect(wrapper.state().showEditModal).toBeFalsy();
    });

    it('should hide add modal when it cancel triggered', () => {
        wrapper.find(AddModal).at(0).simulate('save');
        expect(wrapper.state().showEditModal).toBeFalsy();
    });

});