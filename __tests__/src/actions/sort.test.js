// @flow
import { settingSortColumn, settingSortBy } from '../../../src/actions/sort';
import { SortColumnEnum, SortByTypeEnum } from '../../../src/constant/sort';

describe('sort action', () => {

    it('should change the column of sort feature to createTime', () => {
        expect(settingSortColumn(SortColumnEnum.createTime)).toEqual({
            type: 'sortColumn',
            column: 'createTime',
        });
    });

    it('should change the column of sort feature to dueDate', () => {
        expect(settingSortColumn(SortColumnEnum.dueDate)).toEqual({
            type: 'sortColumn',
            column: 'dueDate',
        });
    });

    it('should change the column of sort feature to createTime', () => {
        expect(settingSortColumn(SortColumnEnum.createTime)).toEqual({
            type: 'sortColumn',
            column: 'createTime',
        });
    });

    it('should change the rule of sort feature to desc', () => {
        expect(settingSortBy(SortByTypeEnum.desc)).toEqual({
            type: 'sortBy',
            sortBy: 'desc',
        });
    });

    it('should change the rule of sort feature to asc', () => {
        expect(settingSortBy(SortByTypeEnum.asc)).toEqual({
            type: 'sortBy',
            sortBy: 'asc',
        });
    });
    
});