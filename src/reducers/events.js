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
                description: action.eventState.description,
                notificationDate: action.eventState.notificationDate,
                notificationTime: action.eventState.notificationTime,
            }
        ]);
        
    case ActionTypes.Edit:
        return (
            state.map( eventState => {
                if (eventState.id == action.eventState.id) {
                    return {
                        ...action.eventState
                    };
                }
                return eventState;
            })
        );
    
    default:
        return state;
    }
}

export default evens;