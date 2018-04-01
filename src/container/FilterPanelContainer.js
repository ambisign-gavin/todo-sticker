// @flow
import FilterPanel from '../component/filterPanel/FilterPanel';
import {connect} from 'react-redux';
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';
import {settingDueDateFilter, settingCompleteStatusFilter} from '../actions/filter';

const mapDispatchToProps = (dispatch) => (
    {
        handleDueDateFilterChanged: (filter: DueDateFilter) => dispatch(settingDueDateFilter(filter)),
        handleCompleteStatusFilterChanged: (filter: CompleteStatusFilter) => dispatch(settingCompleteStatusFilter(filter))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(FilterPanel);
