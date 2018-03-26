// @flow
import type {Actions} from '../actions';
import type {EventState} from '../states';
import {ActionTypes} from '../actions';

function evens(state: EventState[] = [], action: Actions) {
    switch (action.type) {
    case ActionTypes.Add:
        return ([
            ...state,
            {
                id: state.length + 1,
                description: action.eventState.description
            }
        ]);
    
    default:
        return state;
    }
}

export default evens;