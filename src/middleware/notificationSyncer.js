// @flow
import { type Actions, ActionTypes } from '../actions';
import notifyServer from '../class/notify/notifyServer';

export function notificationSyncer() {
    
    return (next: (actions: Actions) => Actions) => (action: Actions) => {
        let returnValue = next(action);
        switch (action.type) {
        case ActionTypes.Add:
            if (action.todoState.dueDatetime > new Date().getTime()) {
                notifyServer.addSchedule(action.todoState.id || '', action.todoState.dueDatetime, action.todoState.description);
            }
            break;
        case ActionTypes.Edit:
            if (action.todoState.dueDatetime > new Date().getTime()) {
                notifyServer.updateSchedule(
                    (action.todoState.id || ''),
                    action.todoState.dueDatetime,
                    action.todoState.description
                );
            }
            break;
        case ActionTypes.Delete:
            notifyServer.removeSchedule(action.id);
            break;
        case ActionTypes.Complete:
            notifyServer.removeSchedule(action.id);
            break;
        default:
            break;
        }
        return returnValue;
    };
}