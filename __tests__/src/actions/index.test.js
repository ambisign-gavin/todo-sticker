// @flow
import { createStore, type Store } from 'redux';
import { addEvent, editEvent, deleteTodo, completeTodo } from '../../../src/actions';
import { type TodoState } from '../../../src/states';

describe('index action', () => {
    let store: Store;
    let reducer = jest.fn();
    let todoState: TodoState = {
        id: '1',
        dueDatetime: 1,
        description: 'test todo',
        complete: false,
        createTime: 1,
    };

    beforeAll(() => {
        store = createStore(reducer);
    });

    it('should add event', () => {
        store.dispatch(addEvent(todoState));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'add',
            todoState
        });
    });

    it('should edit event', () => {
        store.dispatch(editEvent(todoState));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'edit',
            todoState
        });
    });

    it('should delete todo', () => {
        store.dispatch(deleteTodo('id01'));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'delete',
            id: 'id01',
        });
    });

    it('should complete todo', () => {
        store.dispatch(completeTodo('id01'));
        expect(reducer.mock.calls.length).toEqual(1);
        expect(reducer.mock.calls[0][1]).toEqual({
            type: 'complete',
            id: 'id01',
        });
    });

});
