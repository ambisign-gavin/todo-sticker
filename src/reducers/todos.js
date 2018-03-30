// @flow
import type {Actions} from '../actions';
import type {TodoState} from '../states';
import {ActionTypes} from '../actions';

function todos(state: TodoState[] = [], action: Actions) {
    switch (action.type) {
    case ActionTypes.Add:
        return ([
            ...state,
            {
                id: state.length + 1,
                description: action.todoState.description,
                notificationDate: action.todoState.notificationDate,
                notificationTime: action.todoState.notificationTime,
            }
        ]);
        
    case ActionTypes.Edit:
        return (
            state.map( todoState => {
                if (todoState.id == action.todoState.id) {
                    return {
                        ...action.todoState
                    };
                }
                return todoState;
            })
        );
    
    default:
        return state;
    }
}

export default todos;