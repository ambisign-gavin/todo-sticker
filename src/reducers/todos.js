// @flow
import type {Actions, EditAction, DeleteAction, CompleteAction} from '../actions';
import type {TodoState} from '../states';
import {ActionTypes} from '../actions';
import uniqid from 'uniqid';

function todos(state: TodoState[] = [], action: Actions) {

    switch (action.type) {
    case ActionTypes.Add:
        return ([
            ...state,
            {
                id: uniqid(),
                description: action.todoState.description,
                dueDatetime: action.todoState.dueDatetime,
                complete: false,
                createTime: new Date().getTime(),
            }
        ]);

    case ActionTypes.Edit:
        let editAction: EditAction = action;
        return (
            state.map( todoState => {
                if (todoState.id == editAction.todoState.id) {
                    return {
                        ...todoState,
                        ...editAction.todoState
                    };
                }
                return todoState;
            })
        );

    case ActionTypes.Delete:
        let deleteAction: DeleteAction = action;
        return state.filter(todoState => todoState.id !== deleteAction.id);

    case ActionTypes.Complete:
        let completeAction: CompleteAction = action;
        return (
            state.map( todoState => {
                if (todoState.id === completeAction.id) {
                    return {
                        ...todoState,
                        complete: true
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
