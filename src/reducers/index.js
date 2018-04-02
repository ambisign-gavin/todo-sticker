// @flow
import { combineReducers } from 'redux';
import todos from './todos';
import filter from './filter';
import sort from './sort';

export default combineReducers(
    {
        todos,
        filter,
        sort
    }
);
