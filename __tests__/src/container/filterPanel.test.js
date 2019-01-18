// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import FilterPanel from '../../../src/container/filterPanel';
import { Radio } from 'antd';
import { DueDateFilterEnum, CompleteStatusFilterEnum } from '../../../src/constant/filter';
import configureStore from 'redux-mock-store';
import { settingDueDateFilter, settingCompleteStatusFilter } from '../../../src/actions/filter';

describe('FilterPanel', () => {
    let wrapper: ShallowWrapper;
    let wrapperContainer: ShallowWrapper;
    let onHide = jest.fn();

    let store = configureStore()({
        filter: {
            dueDate: DueDateFilterEnum.all,
            completeStatus: CompleteStatusFilterEnum.all
        }
    });

    beforeAll(() => {
        wrapperContainer = shallow(
            <FilterPanel
                store={store}
                show={true}
                onHide={onHide}
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

    it('should render correct only component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should change due date filter', () => {
        const event = {
            target: {
                value: DueDateFilterEnum.today
            }
        };
        wrapper.find(Radio.Group).at(0).simulate('change', event);
        expect(store.getActions()).toEqual([settingDueDateFilter(DueDateFilterEnum.today)]);
    });

    it('should change complete status filter', () => {
        const event = {
            target: {
                value: CompleteStatusFilterEnum.uncomplete
            }
        };
        wrapper.find(Radio.Group).at(1).simulate('change', event);
        expect(store.getActions()).toEqual([settingCompleteStatusFilter(CompleteStatusFilterEnum.uncomplete)]);
    });

    it('should trigger onHidden when click outside', () => {
        wrapper.find('MaskDiv').simulate('click');
        expect(onHide.mock.calls.length).toEqual(1);
    });

});
