// @flow
import TodoList from '../component/todoList/todoList';
import type { AppState } from '../states';
import {connect} from 'react-redux';
import type {TodoState} from '../states/index';
import {DueDateFilterEnum} from '../constant/filter';
import moment from 'moment';

function filterWithDueDate(state: AppState): TodoState[] {
    switch (state.filter.dueDate) {
    case DueDateFilterEnum.all:
        return state.todos;
    case DueDateFilterEnum.today:
        let today: string = moment().format('YYYY-MM-DD');
        return state.todos.filter(todo => today === moment(todo.notificationDate).format('YYYY-MM-DD'));
    default:
        return state.todos;
    }

}

function getListWithFilter(state: AppState): TodoState[] {
    let todos: TodoState[] = [];
    todos = filterWithDueDate(state);
    return todos;
}

const mapStateToProps = (state: AppState) => (
    {
        todoLists: getListWithFilter(state)
    }
);

export default connect(mapStateToProps)(TodoList);
