// @flow
import { settingDueDateFilter, settingCompleteStatusFilter } from '../../../src/actions/filter';
import { DueDateFilterEnum, CompleteStatusFilterEnum } from '../../../src/constant/filter';

describe('filter action', () => {

    it('should use date filter of all option', () => {
        expect(settingDueDateFilter(DueDateFilterEnum.all)).toEqual({
            type: 'dueDateFilter',
            filter: 'all',
        });
    });

    it('should use date filter of today option', () => {
        expect(settingDueDateFilter(DueDateFilterEnum.today)).toEqual({
            type: 'dueDateFilter',
            filter: 'today',
        });
    });

    it('should use complete status filter of all option', () => {
        expect(settingCompleteStatusFilter(CompleteStatusFilterEnum.all)).toEqual({
            type: 'completeStatusFilter',
            filter: 'all',
        });
    });

    it('should use complete status filter of complete option', () => {
        expect(settingCompleteStatusFilter(CompleteStatusFilterEnum.complete)).toEqual({
            type: 'completeStatusFilter',
            filter: 'complete',
        });
    });

    it('should use complete status filter of uncomplete option', () => {
        expect(settingCompleteStatusFilter(CompleteStatusFilterEnum.uncomplete)).toEqual({
            type: 'completeStatusFilter',
            filter: 'uncomplete',
        });
    });

});