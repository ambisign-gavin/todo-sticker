// @flow
import type { TodoActions, EditAction, DeleteAction, CompleteAction} from '../actions/todo';
import type {TodoState} from '../states';
import {TodoActionTypeEnum} from '../actions/todo';

function todos(state: TodoState[] = [], action: TodoActions): Array<TodoState> {

    switch (action.type) {
    case TodoActionTypeEnum.Add:
        
        return ([
            ...state,
            action.todoState
        ]);

    case TodoActionTypeEnum.Edit:
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

    case TodoActionTypeEnum.Delete:
        let deleteAction: DeleteAction = action;

        return state.filter(todoState => todoState.id !== deleteAction.id);

    case TodoActionTypeEnum.Complete:
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
