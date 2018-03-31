// @flow
import FilterPanel from '../component/filterPanel/FilterPanel';
import {connect} from 'react-redux';
import type {DueDateFilter} from '../constant/filter';
import {settingDueDateFilter} from '../actions/filter';

const mapDispatchToProps = (dispatch) => (
    {
        handleDueDateFilterChanged: (filter: DueDateFilter) => dispatch(settingDueDateFilter(filter))
    }
);

export default connect(
    null,
    mapDispatchToProps
)(FilterPanel);
