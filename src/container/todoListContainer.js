// @flow
import TodoList from '../component/todoList/todoList';
import type { AppState } from '../states';
import {connect} from 'react-redux';
import type {TodoState} from '../states/index';
import {DueDateFilterEnum, CompleteStatusFilterEnum} from '../constant/filter';
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';
import moment from 'moment';

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

function getListWithFilter(state: AppState): TodoState[] {
    let todos: TodoState[] = state.todos;
    todos = filterWithDueDate(todos, state.filter.dueDate);
    todos = filterWithCompleteStatus(todos, state.filter.completeStatus);
    return todos;
}

const mapStateToProps = (state: AppState) => (
    {
        todoLists: getListWithFilter(state)
    }
);

export default connect(mapStateToProps)(TodoList);
