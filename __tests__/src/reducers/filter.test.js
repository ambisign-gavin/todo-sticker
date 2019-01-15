// @flow
import { createStore, type Store } from 'redux';
import filter from '../../../src/reducers/filter';
import { settingDueDateFilter, settingCompleteStatusFilter } from '../../../src/actions/filter';
import { DueDateFilterEnum, CompleteStatusFilterEnum } from '../../../src/constant/filter';

describe('filter reducer', () => {
    let store: Store = createStore(filter);

    it('should return default state when not match actions', () => {
        store.dispatch({
            type: 'none'
        });
        expect(store.getState()).toEqual({
            dueDate: 'all',
            completeStatus: 'all'
        });
    });

    it('should change the filter due date to today option', () => {
        store.dispatch(settingDueDateFilter(DueDateFilterEnum.today));
        expect(store.getState()).toEqual({
            dueDate: 'today',
            completeStatus: 'all'
        });
    });

    it('should change the filter due date to all option', () => {
        store.dispatch(settingDueDateFilter(DueDateFilterEnum.all));
        expect(store.getState()).toEqual({
            dueDate: 'all',
            completeStatus: 'all'
        });
    });

    it('should change the filter complete status to complete option', () => {
        store.dispatch(settingCompleteStatusFilter(CompleteStatusFilterEnum.complete));
        expect(store.getState()).toEqual({
            dueDate: 'all',
            completeStatus: 'complete'
        });
    });

    it('should change the filter complete status to uncomplete option', () => {
        store.dispatch(settingCompleteStatusFilter(CompleteStatusFilterEnum.uncomplete));
        expect(store.getState()).toEqual({
            dueDate: 'all',
            completeStatus: 'uncomplete'
        });
    });

    it('should change the filter complete status to all option', () => {
        store.dispatch(settingCompleteStatusFilter(CompleteStatusFilterEnum.all));
        expect(store.getState()).toEqual({
            dueDate: 'all',
            completeStatus: 'all'
        });
    });

});