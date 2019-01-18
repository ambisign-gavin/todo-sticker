// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import SortButton from '../../../src/container/sortButton';
import { SortColumnEnum, SortByTypeEnum } from '../../../src/constant/sort';
import { Dropdown } from 'antd';
import configureStore from 'redux-mock-store';
import { settingSortColumn, settingSortBy } from '../../../src/actions/sort';

describe('SortButton', () => {
    let wrapper: ShallowWrapper;
    let wrapperContainer: ShallowWrapper;
    let store = configureStore()({
        sort: {
            sortBy: SortByTypeEnum.asc,
            sortColumn: SortColumnEnum.createTime
        }
    });

    beforeAll(() => {
        wrapperContainer = shallow(
            <SortButton
                store={store}
            />
        );

        wrapper = wrapperContainer.shallow();
    });

    afterEach(() => {
        store.clearActions();
    });

    it('should render correct as container', () => {
        expect(wrapperContainer).toMatchSnapshot();
    });

    it('should render correct as component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle sort column change', () => {
        let menuClickValue = {
            key : SortColumnEnum.dueDate,
        };
        let menu = shallow(wrapper.find(Dropdown).prop('overlay'));
        menu.simulate('click', menuClickValue);
        expect(store.getActions()).toEqual([settingSortColumn(SortColumnEnum.dueDate)]);
    });

    it('should handle sort rule change', () => {
        wrapper.find('SortRuleSpan').simulate('click');
        expect(store.getActions()).toEqual([settingSortBy(SortByTypeEnum.desc)]);
        
    });

});