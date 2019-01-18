// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import FilterPanel from '../../../src/component/filterPanel';
import { Radio } from 'antd';
import { DueDateFilterEnum, CompleteStatusFilterEnum } from '../../../src/constant/filter';

describe('FilterPanel', () => {
    let wrapper: ShallowWrapper;
    let handleDueDateFilterChanged = jest.fn();
    let handleCompleteStatusFilterChanged = jest.fn();
    let onHidden = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <FilterPanel
                show={true}
                handleDueDateFilterChanged={handleDueDateFilterChanged}
                handleCompleteStatusFilterChanged={handleCompleteStatusFilterChanged}
                onHidden={onHidden}
                defaultDueDateFilter='all'
                defaultCompleteStatusFilter='all'
            />
        );
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should change due date filter', () => {
        const event = {
            target: {
                value: DueDateFilterEnum.today
            }
        };
        wrapper.find(Radio.Group).at(0).simulate('change', event);
        expect(handleDueDateFilterChanged.mock.calls.length).toEqual(1);
        expect(handleDueDateFilterChanged.mock.calls[0][0]).toEqual(DueDateFilterEnum.today);
    });

    it('should change complete status filter', () => {
        const event = {
            target: {
                value: CompleteStatusFilterEnum.uncomplete
            }
        };
        wrapper.find(Radio.Group).at(1).simulate('change', event);
        expect(handleCompleteStatusFilterChanged.mock.calls.length).toEqual(1);
        expect(handleCompleteStatusFilterChanged.mock.calls[0][0]).toEqual(CompleteStatusFilterEnum.uncomplete);
    });

    it('should trigger onHidden when click outside', () => {
        wrapper.find('MaskDiv').simulate('click');
        expect(onHidden.mock.calls.length).toEqual(1);
        expect(wrapper.state().show).toBeFalsy();
    });

});
