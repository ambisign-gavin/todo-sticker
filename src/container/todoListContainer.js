// @flow
import TodoList from '../component/todoList/todoList';
import type { AppState } from '../states';
import {connect} from 'react-redux';
import type {TodoState} from '../states/index';
import {DueDateFilterEnum, CompleteStatusFilterEnum} from '../constant/filter';
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';
import moment from 'moment';
import type {SortState} from '../states/index';
import {SortColumnEnum} from '../constant/sort';

function filterWithDueDate(todos: TodoState[], filter: DueDateFilter): TodoState[] {
    switch (filter) {
    case DueDateFilterEnum.today:
        let today: string = moment().format('YYYY-MM-DD');
        return todos.filter(todo => today === moment(todo.dueDatetime).format('YYYY-MM-DD'));
    case DueDateFilterEnum.all:
    default:
        return todos;
    }

}

function filterWithCompleteStatus(todos: TodoState[], filter: CompleteStatusFilter): TodoState[] {
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

function getListWithFilterAndSort(state: AppState): TodoState[] {
    let todos: TodoState[] = state.todos;
    todos = filterWithDueDate(todos, state.filter.dueDate);
    todos = filterWithCompleteStatus(todos, state.filter.completeStatus).reverse();
    todos = sortByColumn(todos, state.sort);
    return todos;
}

function sortByColumn(todos: TodoState[], sortState: SortState): TodoState[] {
    if (sortState.sortColumn === SortColumnEnum.createTime) {
        todos.sort(function(a: TodoState, b: TodoState) {
            return (a.createTime || 0) - (b.createTime || 0);
        });
    } else if (sortState.sortColumn === SortColumnEnum.dueDate) {
        todos.sort(function(a: TodoState, b: TodoState) {
            return (a.dueDatetime || 0) - (b.dueDatetime || 0);
        });
    }
    return todos.map(todo => todo); //return new array
}

const mapStateToProps = (state: AppState) => (
    {
        todoLists: getListWithFilterAndSort(state)
    }
);

export default connect(mapStateToProps)(TodoList);
