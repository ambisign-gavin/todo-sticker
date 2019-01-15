// @flow
import { createStore, type Store } from 'redux';
import { settingSortColumn, settingSortBy } from '../../../src/actions/sort';
import { SortColumnEnum, SortByTypeEnum } from '../../../src/constant/sort';

describe('sort action', () => {
    let store: Store;
    let reducer = jest.fn();

    beforeAll(() => {
        store = createStore(reducer);
    });

    it('should change the column of sort feature to createTime', () => {
        store.dispatch(settingSortColumn(SortColumnEnum.createTime));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'sortColumn',
            column: 'createTime',
        });
    });

    it('should change the column of sort feature to dueDate', () => {
        store.dispatch(settingSortColumn(SortColumnEnum.dueDate));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'sortColumn',
            column: 'dueDate',
        });
    });

    it('should change the column of sort feature to createTime', () => {
        store.dispatch(settingSortColumn(SortColumnEnum.createTime));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'sortColumn',
            column: 'createTime',
        });
    });

    it('should change the rule of sort feature to desc', () => {
        store.dispatch(settingSortBy(SortByTypeEnum.desc));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'sortBy',
            sortBy: 'desc',
        });
    });

    it('should change the rule of sort feature to asc', () => {
        store.dispatch(settingSortBy(SortByTypeEnum.asc));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'sortBy',
            sortBy: 'asc',
        });
    });
    
});