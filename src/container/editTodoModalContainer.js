// @flow
import EditModal from '../component/eventEditModal/eventEditModal';
import type { TodoState } from '../states';
import { editEvent } from '../actions';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => (
    {
        handleEditEvent: (todoState: TodoState) => dispatch(editEvent(todoState))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(EditModal);