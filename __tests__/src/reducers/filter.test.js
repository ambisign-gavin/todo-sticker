// @flow
import filter from '../../../src/reducers/filter';
import { DueDateFilterEnum, CompleteStatusFilterEnum } from '../../../src/constant/filter';

describe('filter reducer due date', () => {

    it('should change to today option', () => {
        let result = filter(undefined, {
            type: 'dueDateFilter',
            filter: DueDateFilterEnum.today,
        });
        expect(result).toEqual({
            dueDate: DueDateFilterEnum.today,
            completeStatus: CompleteStatusFilterEnum.all
        });
    });

    it('should change to all option', () => {
        let result = filter(undefined, {
            type: 'dueDateFilter',
            filter: DueDateFilterEnum.all,
        });
        expect(result).toEqual({
            dueDate: DueDateFilterEnum.all,
            completeStatus: CompleteStatusFilterEnum.all
        });
    });
});

describe('filter reducer complete status', () => {

    it('should change to complete option', () => {
        let result = filter(undefined, {
            type: 'completeStatusFilter',
            filter: CompleteStatusFilterEnum.complete,
        });
        expect(result).toEqual({
            dueDate: DueDateFilterEnum.all,
            completeStatus: CompleteStatusFilterEnum.complete
        });
    });

    it('should change the to uncomplete option', () => {
        let result = filter(undefined, {
            type: 'completeStatusFilter',
            filter: CompleteStatusFilterEnum.uncomplete,
        });
        expect(result).toEqual({
            dueDate: DueDateFilterEnum.all,
            completeStatus: CompleteStatusFilterEnum.uncomplete
        });
    });

    it('should change to all option', () => {
        let result = filter(undefined, {
            type: 'completeStatusFilter',
            filter: CompleteStatusFilterEnum.all,
        });
        expect(result).toEqual({
            dueDate: DueDateFilterEnum.all,
            completeStatus: CompleteStatusFilterEnum.all
        });
    });

});