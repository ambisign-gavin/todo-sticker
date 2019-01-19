// @flow
import TodoList from '../component/todoList';
import type { AppState } from '../states';
import {connect} from 'react-redux';
import type {TodoState} from '../states/index';
import {DueDateFilterEnum, CompleteStatusFilterEnum} from '../constant/filter';
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';
import moment from 'moment';
import type {SortState} from '../states/index';
import {SortColumnEnum, SortByTypeEnum} from '../constant/sort';

export function filterWithDueDate(todos: Array<TodoState>, filter: DueDateFilter): Array<TodoState> {
    switch (filter) {
    case DueDateFilterEnum.today:
        let today: string = moment().format('YYYY-MM-DD');
        return todos.filter(todo => today === moment(todo.dueDatetime).format('YYYY-MM-DD'));
    case DueDateFilterEnum.all:
    default:
        return todos;
    }

}

export function filterWithCompleteStatus(todos: Array<TodoState>, filter: CompleteStatusFilter): Array<TodoState> {
    switch (filter) {
    case CompleteStatusFilterEnum.complete:
        return todos.filter(todo => todo.complete);
    case CompleteStatusFilterEnum.uncomplete:
        return todos.filter(todo => !todo.complete);
    case CompleteStatusFilterEnum.all:
    default:
        return todos;
    }
}

function getListWithFilterAndSort(state: AppState): Array<TodoState> {
    let todos: Array<TodoState> = state.todos;
    todos = filterWithDueDate(todos, state.filter.dueDate);
    todos = filterWithCompleteStatus(todos, state.filter.completeStatus).reverse();
    todos = sortByColumn(todos, state.sort);
    return todos;
}

export function sortByColumn(todos: Array<TodoState>, sortState: SortState): Array<TodoState> {
    let result: Array<TodoState> = todos.map(todo => todo);
    
    if (sortState.sortColumn === SortColumnEnum.createTime) {
        result.sort(function(a: TodoState, b: TodoState) {
            return (a.createTime || 0) - (b.createTime || 0);
        });
    } else if (sortState.sortColumn === SortColumnEnum.dueDate) {
        result.sort(function(a: TodoState, b: TodoState) {
            return (a.dueDatetime || 0) - (b.dueDatetime || 0);
        });
    }

    if (sortState.sortBy === SortByTypeEnum.desc) {
        result.reverse();
    }
    return result; //return new array
}

const mapStateToProps = (state: AppState) => (
    {
        todos: getListWithFilterAndSort(state)
    }
);

export default connect(mapStateToProps)(TodoList);
