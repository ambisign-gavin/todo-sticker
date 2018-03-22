// @flow
import AddEvent from '../component/addEvent';
import {addEvent} from '../actions'
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        handleAddEvent: (description: string) => dispatch(addEvent(description))
    }
)

export default connect(
    null,
    mapDispatchToProps
)(AddEvent)