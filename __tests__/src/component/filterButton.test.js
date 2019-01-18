// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import FilterButton from '../../../src/component/filterButton';
import { Button } from 'antd';

describe('FilterButton', () => {
    let wrapper: ShallowWrapper;
    let onClick = jest.fn();
    beforeAll(() => {
        wrapper = shallow(<FilterButton onClick={onClick} />);
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should trigger onClick', () => {
        wrapper.find(Button).simulate('click');
        expect(onClick.mock.calls.length).toEqual(1);
    });

});
