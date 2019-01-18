// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import EditModal from '../../../src/component/eventEditModal';
import { Modal, DatePicker, TimePicker, Input } from 'antd';
import moment from 'moment';

describe('EditModal', () => {
    let wrapper: ShallowWrapper;
    let handleAddEvent = jest.fn();
    let onSave = jest.fn();
    
    beforeAll(() => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValueOnce(0);
        wrapper = shallow(
            <EditModal
                visible={true}
                title='Test'
                title='Title'
                todoId='1'
                defaultDueDatetime={0}
                defaultDescription='Test description'
                handleAddEvent={handleAddEvent}
                onSave={onSave}
            />
        );
        
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle date changed', () => {
        let changeExpect = moment('2019-01-10T10:45:20+00:00');
        wrapper.find(DatePicker).simulate('change', changeExpect);
        let result = new Date(wrapper.state().dueDatetime);
        expect(result.getUTCFullYear()).toEqual(2019);
        expect(result.getUTCMonth() + 1).toEqual(1);
        expect(result.getUTCDate()).toEqual(10);
    });

    it('should handle time changed', () => {
        let changeExpect = moment('2019-01-10T10:45:20+00:00');
        wrapper.find(TimePicker).simulate('change', changeExpect);
        let result = new Date(wrapper.state().dueDatetime);
        expect(result.getUTCHours()).toEqual(10);
        expect(result.getUTCMinutes()).toEqual(45);
    });

    it('should handle descriptions changed', () => {
        const event = {
            currentTarget: { 
                value: 'Hello there!' 
            }
        };
        wrapper.find(Input.TextArea).simulate('change', event);
        expect(wrapper.state().desctiption).toEqual('Hello there!');
    });

    it('should handle ok', () => {
        let changeExpect = moment('2019-01-10T10:45:20+00:00');
        const event = {
            currentTarget: { 
                value: 'Hello!' 
            }
        };

        wrapper.find(DatePicker).simulate('change', changeExpect);
        wrapper.find(TimePicker).simulate('change', changeExpect);
        wrapper.find(Input.TextArea).simulate('change', event);
        wrapper.find(Modal).simulate('ok');

        expect(handleAddEvent.mock.calls.length).toEqual(1);
        expect(handleAddEvent.mock.calls[0][0]).toEqual({
            description: 'Hello!',
            dueDatetime: moment('2019-01-10T10:45:00+00:00').toDate().getTime(),
        });
    });

});