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
                    eventState.description = action.eventState.description;
                    eventState.notificationDate = action.eventState.notificationDate;
                    eventState.notificationTime = action.eventState.notificationTime;
                }
                return eventState;
            })
        );
    
    default:
        return state;
    }
}

export default evens;