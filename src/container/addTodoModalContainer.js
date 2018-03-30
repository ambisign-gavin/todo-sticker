// @flow
import EditModal from '../component/eventEditModal/eventEditModal';
import type { EventState } from '../states';
import {addEvent} from '../actions';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => (
    {
        handleAddEvent: (eventState: EventState) => dispatch(addEvent(eventState))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(EditModal);