// @flow
import type {EventsState, Actions} from '../actions'
import {ActionTypes} from '../actions'

function evens(state: EventsState[] = [], action: Actions) {
    switch (action.type) {
        case ActionTypes.Add:
            return ([
                ...state,
                {
                    id: state.length + 1,
                    description: action.description
                }
            ]);
    
        default:
            return state;
    }
}

export default evens;