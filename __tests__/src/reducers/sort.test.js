// @flow
import { createStore, type Store } from 'redux';
import sort from '../../../src/reducers/sort';
import { settingSortBy, settingSortColumn } from '../../../src/actions/sort';
import { SortByTypeEnum, SortColumnEnum } from '../../../src/constant/sort';

describe('sort reducer', () => {
    let store: Store = createStore(sort);

    it('should return default state when not match actions', () => {
        store.dispatch({
            type: 'none'
        });
        expect(store.getState()).toEqual({
            sortBy: 'asc',
            sortColumn: 'dueDate'
        });
    });

    it('should change sort rule to desc option', () => {
        store.dispatch(settingSortBy(SortByTypeEnum.desc));
        expect(store.getState()).toEqual({
            sortBy: 'desc',
            sortColumn: 'dueDate'
        });
    });

    it('should change sort rule to asc option', () => {
        store.dispatch(settingSortBy(SortByTypeEnum.asc));
        expect(store.getState()).toEqual({
            sortBy: 'asc',
            sortColumn: 'dueDate'
        });
    });

    it('should change sort column to createTime option', () => {
        store.dispatch(settingSortColumn(SortColumnEnum.createTime));
        expect(store.getState()).toEqual({
            sortBy: 'asc',
            sortColumn: 'createTime'
        });
    });

    it('should change sort column to dueDate option', () => {
        store.dispatch(settingSortColumn(SortColumnEnum.dueDate));
        expect(store.getState()).toEqual({
            sortBy: 'asc',
            sortColumn: 'dueDate'
        });
    });

});