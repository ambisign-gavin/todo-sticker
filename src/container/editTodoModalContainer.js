// @flow
import EditModal from '../component/eventEditModal';
import type { TodoState } from '../states';
import { editTodo } from '../actions';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => (
    {
        handleEditEvent: (todoState: TodoState) => dispatch(editTodo(todoState))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(EditModal);