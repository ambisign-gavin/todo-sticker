// @flow
import deleteButton from '../component/deleteButton/deleteButton';
import {deleteTodo} from '../actions/index';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => (
    {
        handleDeleteTodo: (id: number) => dispatch(deleteTodo(id))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(deleteButton);
