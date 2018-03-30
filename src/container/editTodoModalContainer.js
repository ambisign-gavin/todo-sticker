// @flow
import EditModal from '../component/eventEditModal/eventEditModal';
import type { EventState } from '../states';
import { editEvent } from '../actions';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => (
    {
        handleEditEvent: (eventState: EventState) => dispatch(editEvent(eventState))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(EditModal);