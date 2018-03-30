// @flow
import TodoList from '../component/todoList/todoList';
import type { AppState } from '../states';
import {connect} from 'react-redux';

const mapStateToProps = (state: AppState) => (
    {
        todoLists: state.todos
    }
);

export default connect(mapStateToProps)(TodoList);