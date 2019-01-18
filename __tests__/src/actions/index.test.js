// @flow
import { addTodo, editTodo, deleteTodo, completeTodo } from '../../../src/actions';
import { type TodoState } from '../../../src/states';

describe('index action', () => {
    
    let todoState: TodoState = {
        id: '1',
        dueDatetime: 1,
        description: 'test todo',
        complete: false,
        createTime: 1,
    };

    it('should add event', () => {
        expect(addTodo(todoState)).toEqual({
            type: 'add',
            todoState
        });
    });

    it('should edit event', () => {
        expect(editTodo(todoState)).toEqual({
            type: 'edit',
            todoState
        });
    });

    it('should delete todo', () => {
        expect(deleteTodo('id01')).toEqual({
            type: 'delete',
            id: 'id01',
        });
    });

    it('should complete todo', () => {
        expect(completeTodo('id01')).toEqual({
            type: 'complete',
            id: 'id01',
        });
    });

});
