// @flow
import { createStore, type Store } from 'redux';
import { settingDueDateFilter, settingCompleteStatusFilter } from '../../../src/actions/filter';
import { DueDateFilterEnum, CompleteStatusFilterEnum } from '../../../src/constant/filter';

describe('filter action', () => {
    let store: Store;
    let reducer = jest.fn();
    beforeAll(() => {
        store = createStore(reducer);
    });

    it('should use date filter of all option', () => {
        store.dispatch(settingDueDateFilter(DueDateFilterEnum.all));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'dueDateFilter',
            filter: 'all',
        });
    });

    it('should use date filter of today option', () => {
        store.dispatch(settingDueDateFilter(DueDateFilterEnum.today));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'dueDateFilter',
            filter: 'today',
        });
    });

    it('should use complete status filter of all option', () => {
        store.dispatch(settingCompleteStatusFilter(CompleteStatusFilterEnum.all));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'completeStatusFilter',
            filter: 'all',
        });
    });

    it('should use complete status filter of complete option', () => {
        store.dispatch(settingCompleteStatusFilter(CompleteStatusFilterEnum.complete));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'completeStatusFilter',
            filter: 'complete',
        });
    });

    it('should use complete status filter of uncomplete option', () => {
        store.dispatch(settingCompleteStatusFilter(CompleteStatusFilterEnum.uncomplete));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'completeStatusFilter',
            filter: 'uncomplete',
        });
    });

});