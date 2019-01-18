// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import TodosPage from '../../../src/component/todosPage';
import FilterButton from '../../../src/component/filterButton';
import FilterPanelContainer from '../../../src/container/filterPanelContainer';

describe('TodosPage', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
        wrapper = shallow(<TodosPage/>);
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should show filter panel', () => {
        wrapper.find(FilterButton).simulate('click');
        expect(wrapper.state().showPanel).toBeTruthy();
    });

    it('should hide filter panel', () => {
        wrapper.find(FilterPanelContainer).simulate('hidden');
        expect(wrapper.state().showPanel).toBeFalsy();
    });

});