// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import EditModal from '../../../src/component/eventEditModal';
import { Modal, DatePicker, TimePicker, Input } from 'antd';
import moment from 'moment';

describe('EditModal with null todoState', () => {
    let wrapper: ShallowWrapper;
    let onSave = jest.fn();
    
    beforeAll(() => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValueOnce(0);
        wrapper = shallow(
            <EditModal
                visible={true}
                title='Title'
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
        let result = new Date(wrapper.state().todoState.dueDatetime);
        expect(result.getUTCFullYear()).toEqual(2019);
        expect(result.getUTCMonth() + 1).toEqual(1);
        expect(result.getUTCDate()).toEqual(10);
    });

    it('should handle time changed', () => {
        let changeExpect = moment('2019-01-10T10:45:20+00:00');
        wrapper.find(TimePicker).simulate('change', changeExpect);
        let result = new Date(wrapper.state().todoState.dueDatetime);
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
        expect(wrapper.state().todoState.description).toEqual('Hello there!');
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

        expect(onSave.mock.calls.length).toEqual(1);
        expect(onSave.mock.calls[0][0]).toEqual({
            description: 'Hello!',
            dueDatetime: moment('2019-01-10T10:45:00+00:00').toDate().getTime(),
        });
    });

});

describe('EditModal with todoState', () => {
    let wrapper: ShallowWrapper;
    let onSave = jest.fn();
    
    beforeAll(() => {
        jest.spyOn(Date.prototype, 'getTime').mockReturnValueOnce(0);
        wrapper = shallow(
            <EditModal
                visible={true}
                title='Title'
                onSave={onSave}
                todoState={{
                    id: '1',
                    description: 'Yo ~!',
                    dueDatetime: moment('2019-01-10T10:45:00+00:00').toDate().getTime(),
                    createTime: 0,
                    complete: false,
                }}
            />
        );
        
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle date changed', () => {
        let changeExpect = moment('2019-05-16T15:05:00+00:00');
        wrapper.find(DatePicker).simulate('change', changeExpect);
        let result = new Date(wrapper.state().todoState.dueDatetime);
        expect(result.getUTCFullYear()).toEqual(2019);
        expect(result.getUTCMonth() + 1).toEqual(5);
        expect(result.getUTCDate()).toEqual(16);
    });

    it('should handle time changed', () => {
        let changeExpect = moment('2019-05-16T15:05:00+00:00');
        wrapper.find(TimePicker).simulate('change', changeExpect);
        let result = new Date(wrapper.state().todoState.dueDatetime);
        expect(result.getUTCHours()).toEqual(15);
        expect(result.getUTCMinutes()).toEqual(5);
    });

    it('should handle descriptions changed', () => {
        const event = {
            currentTarget: { 
                value: 'Hello there!' 
            }
        };
        wrapper.find(Input.TextArea).simulate('change', event);
        expect(wrapper.state().todoState.description).toEqual('Hello there!');
    });

    it('should handle ok', () => {
        let changeExpect = moment('2019-05-16T15:05:00+00:00');
        const event = {
            currentTarget: { 
                value: 'Hello!' 
            }
        };

        wrapper.find(DatePicker).simulate('change', changeExpect);
        wrapper.find(TimePicker).simulate('change', changeExpect);
        wrapper.find(Input.TextArea).simulate('change', event);
        wrapper.find(Modal).simulate('ok');

        expect(onSave.mock.calls.length).toEqual(1);
        expect(onSave.mock.calls[0][0]).toEqual({
            description: 'Hello!',
            dueDatetime: moment('2019-05-16T15:05:00+00:00').toDate().getTime(),
            id: '1',
            createTime: 0,
            complete: false,
        });
    });

});