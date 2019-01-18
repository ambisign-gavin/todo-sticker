// @flow
import SortButton from '../component/sortButton';
import {connect} from 'react-redux';
import type {SortColumn, SortByType} from '../constant/sort';
import {settingSortColumn, settingSortBy} from '../actions/sort';
import type {AppState} from '../states/index';

const mapStateToProps = (state: AppState) => (
    {
        sortColumn: state.sort.sortColumn,
        sortByType: state.sort.sortBy
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        handleSortColumnSelected: (column: SortColumn) => dispatch(settingSortColumn(column)),
        handleSortByChanged: (sortBy: SortByType) => dispatch(settingSortBy(sortBy))
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortButton);
