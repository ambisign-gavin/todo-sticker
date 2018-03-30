// @flow
import EditModal from '../component/eventEditModal/eventEditModal';
import type { TodoState } from '../states';
import {addEvent} from '../actions';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => (
    {
        handleAddEvent: (todoState: TodoState) => dispatch(addEvent(todoState))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(EditModal);