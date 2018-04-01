// @flow
import CompleteTodoButton from '../component/complteTodoButton/completeTodoButton';
import {completeTodo} from '../actions/index';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => (
    {
        handleCompleteTodo: (id: number) => dispatch(completeTodo(id))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(CompleteTodoButton);
