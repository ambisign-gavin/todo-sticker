// @flow
import SortButton from '../component/sortButton/sortButton';
import {connect} from 'react-redux';
import type {SortColumn} from '../constant/sort';
import {settingSortColumn} from '../actions/sort';

const mapDispatchToProps = (dispatch) => (
    {
        handleSortColumnSelected: (column: SortColumn) => dispatch(settingSortColumn(column))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(SortButton);
