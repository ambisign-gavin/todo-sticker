// @flow
import FilterPanel from '../component/filterPanel';
import {connect} from 'react-redux';
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';
import {settingDueDateFilter, settingCompleteStatusFilter} from '../actions/filter';
import type {AppState} from '../states/index';

const mapStateToProps = (state: AppState) => (
    {
        defaultDueDateFilter: state.filter.dueDate,
        defaultCompleteStatusFilter: state.filter.completeStatus,
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        handleDueDateFilterChanged: (filter: DueDateFilter) => dispatch(settingDueDateFilter(filter)),
        handleCompleteStatusFilterChanged: (filter: CompleteStatusFilter) => dispatch(settingCompleteStatusFilter(filter))
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterPanel);
