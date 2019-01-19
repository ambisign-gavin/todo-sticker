// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import TodoListWithSortAndFilter, {
    filterWithDueDate,
    filterWithCompleteStatus,
    sortByColumn
} from '../../../src/container/todoListWithSortAndFilter';
import configureStore from 'redux-mock-store';
import { type AppState } from '../../../src/states';
import { DueDateFilterEnum, CompleteStatusFilterEnum } from '../../../src/constant/filter';
import { SortByTypeEnum, SortColumnEnum } from '../../../src/constant/sort';

describe('TodoListWithSortAndFilter', () => {
    let wrapper: ShallowWrapper;
    let todos = [{
        id: '0',
        dueDatetime: new Date(2019, 1, 15).getTime(),
        description: 'Hello',
        complete: false,
        createTime: new Date(2019, 1, 10).getTime(),
    },{
        id: '1',
        dueDatetime: new Date(2019, 1, 18).getTime(),
        description: 'Hello',
        complete: true,
        createTime: new Date(2019, 1, 11).getTime(),
    },{
        id: '2',
        dueDatetime: new Date(2019, 1, 10).getTime(),
        description: 'Hello',
        complete: true,
        createTime: new Date(2019, 1, 12).getTime(),
    },{
        id: '3',
        dueDatetime: new Date(2019, 3, 15).getTime(),
        description: 'Hello',
        complete: false,
        createTime: new Date(2019, 1, 14).getTime(),
    },{
        id: '4',
        dueDatetime: new Date(2019, 1, 15).getTime(),
        description: 'Hello',
        complete: true,
        createTime: new Date(2019, 1, 13).getTime(),
    }];

    const setup = (initialState: AppState) => {
        let store = configureStore()(initialState);
        wrapper = shallow(<TodoListWithSortAndFilter store={store} />);
        return {
            store,
            wrapper
        };
    };

    it('should render correct', () => {
        const { wrapper } = setup({
            todos,
            filter: {
                dueDate: DueDateFilterEnum.all,
                completeStatus: CompleteStatusFilterEnum.complete,
            },
            sort: {
                sortBy: SortByTypeEnum.desc,
                sortColumn: SortColumnEnum.createTime,
            }
        });
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.prop('todos')).toEqual([
            todos[4],
            todos[2],
            todos[1],
        ]);
    });

    it('should filter duedate is today', () => {
        jest.spyOn(Date, 'now').mockReturnValue(new Date(2019, 1, 15).getTime());

        let result = filterWithDueDate(todos, DueDateFilterEnum.today);
        expect(result).toEqual([
            todos[0],
            todos[4],
        ]);
    });

    it('should not filter duedate', () => {
        jest.spyOn(Date, 'now').mockReturnValue(new Date(2019, 1, 15).getTime());

        let result = filterWithDueDate(todos, DueDateFilterEnum.all);
        expect(result).toEqual(todos);
    });

    it('should filter with complete status', () => {
        let result = filterWithCompleteStatus(todos, CompleteStatusFilterEnum.complete);
        expect(result).toEqual([
            todos[1],
            todos[2],
            todos[4],
        ]);
    });

    it('should filter with uncomplete status', () => {
        let result = filterWithCompleteStatus(todos, CompleteStatusFilterEnum.uncomplete);
        expect(result).toEqual([
            todos[0],
            todos[3],
        ]);
    });

    it('should filter with all status', () => {
        let result = filterWithCompleteStatus(todos, CompleteStatusFilterEnum.all);
        expect(result).toEqual(todos);
    });

    it('should sort asc by createTime ', () => {
        let result = sortByColumn(todos, {
            sortBy: SortByTypeEnum.asc,
            sortColumn: SortColumnEnum.createTime,
        });
        expect(result).toEqual([
            todos[0],
            todos[1],
            todos[2],
            todos[4],
            todos[3],
        ]);
    });

    it('should sort desc by createTime ', () => {
        let result = sortByColumn(todos, {
            sortBy: SortByTypeEnum.desc,
            sortColumn: SortColumnEnum.createTime,
        });
        expect(result).toEqual([
            todos[3],
            todos[4],
            todos[2],
            todos[1],
            todos[0],
        ]);
    });

    it('should sort asc by dueDate ', () => {
        let result = sortByColumn(todos, {
            sortBy: SortByTypeEnum.asc,
            sortColumn: SortColumnEnum.dueDate,
        });
        expect(result).toEqual([
            todos[2],
            todos[0],
            todos[4],
            todos[1],
            todos[3],
        ]);
    });

    it('should sort desc by dueDate ', () => {
        let result = sortByColumn(todos, {
            sortBy: SortByTypeEnum.desc,
            sortColumn: SortColumnEnum.dueDate,
        });
        expect(result).toEqual([
            todos[3],
            todos[1],
            todos[4],
            todos[0],
            todos[2],
        ]);
    });

});