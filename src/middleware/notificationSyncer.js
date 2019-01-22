// @flow
import { type Actions } from '../actions';
import notifyServer from '../tool/notifyServer';
import { TodoActionTypeEnum } from '../actions/todo';

export function notificationSyncer() {
    
    return (next: (actions: Actions) => Actions) => (action: Actions) => {
        let returnValue = next(action);
        switch (action.type) {
        case TodoActionTypeEnum.Add:
            if (action.todoState.dueDatetime > new Date().getTime()) {
                notifyServer.addSchedule(action.todoState.id || '', action.todoState.dueDatetime, action.todoState.description);
            }
            break;
        case TodoActionTypeEnum.Edit:
            if (action.todoState.dueDatetime > new Date().getTime()) {
                notifyServer.updateSchedule(
                    (action.todoState.id || ''),
                    action.todoState.dueDatetime,
                    action.todoState.description
                );
            }
            break;
        case TodoActionTypeEnum.Delete:
            notifyServer.removeSchedule(action.id);
            break;
        case TodoActionTypeEnum.Complete:
            notifyServer.removeSchedule(action.id);
            break;
        default:
            break;
        }
        return returnValue;
    };
}