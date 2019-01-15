// @flow
import sort from '../../../src/reducers/sort';
import { SortByTypeEnum, SortColumnEnum } from '../../../src/constant/sort';

describe('sort reducer sort rule', () => {

    it('should change to desc option', () => {
        let result = sort(undefined, {
            type: 'sortBy',
            sortBy: SortByTypeEnum.desc
        });
        expect(result).toEqual({
            sortBy: SortByTypeEnum.desc,
            sortColumn: SortColumnEnum.dueDate
        });
    });

    it('should change to asc option', () => {
        let result = sort(undefined, {
            type: 'sortBy',
            sortBy: SortByTypeEnum.asc
        });
        expect(result).toEqual({
            sortBy: SortByTypeEnum.asc,
            sortColumn: SortColumnEnum.dueDate
        });
    });

});

describe('sort reducer sort column', () => {

    it('should change to createTime option', () => {
        let result = sort(undefined, {
            type: 'sortColumn',
            column: SortColumnEnum.createTime
        });
        expect(result).toEqual({
            sortBy: SortByTypeEnum.asc,
            sortColumn: SortColumnEnum.createTime
        });
    });

    it('should change to dueDate option', () => {
        let result = sort(undefined, {
            type: 'sortColumn',
            column: SortColumnEnum.dueDate
        });
        expect(result).toEqual({
            sortBy: SortByTypeEnum.asc,
            sortColumn: SortColumnEnum.dueDate
        });
    });

});