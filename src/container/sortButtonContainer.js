// @flow
import SortButton from '../component/sortButton/sortButton';
import {connect} from 'react-redux';
import type {SortColumn} from '../constant/sort';
import {settingSortColumn} from '../actions/sort';
import type {AppState} from '../states/index';

const mapStateToProps = (state: AppState) => (
    {
        sortColumn: state.sort.sortColumn,
        sortByType: state.sort.sortBy
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        handleSortColumnSelected: (column: SortColumn) => dispatch(settingSortColumn(column))
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortButton);
