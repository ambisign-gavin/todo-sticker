// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import SortButton from '../../../src/component/sortButton/sortButton';
import { SortColumnEnum, SortByTypeEnum } from '../../../src/constant/sort';
import { Dropdown } from 'antd';

describe('SortButton', () => {
    let wrapper: ShallowWrapper;
    let handleSortByChanged = jest.fn();
    let handleSortColumnSelected = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <SortButton
                sortColumn={SortColumnEnum.createTime}
                sortByType={SortByTypeEnum.asc}
                handleSortByChanged={handleSortByChanged}
                handleSortColumnSelected={handleSortColumnSelected}
            />
        );
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle sort column change', () => {
        let menuClickValue = {
            key : SortColumnEnum.dueDate,
        };
        let menu = shallow(wrapper.find(Dropdown).prop('overlay'));
        menu.simulate('click', menuClickValue);
        expect(handleSortColumnSelected.mock.calls.length).toEqual(1);
        expect(handleSortColumnSelected.mock.calls[0][0]).toEqual(SortColumnEnum.dueDate);
    });

    it('should handle sort rule change', () => {
        wrapper.find('SortRuleSpan').simulate('click');
        expect(handleSortByChanged.mock.calls.length).toEqual(1);
        expect(handleSortByChanged.mock.calls[0][0]).toEqual(SortByTypeEnum.desc);
        
    });

});