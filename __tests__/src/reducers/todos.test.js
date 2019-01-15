// @flow
import todos from '../../../src/reducers/todos';
import { type TodoState } from '../../../src/states';

jest.mock('electron', () => {
    let ipcRenderer = {
        send: jest.fn(),
    };
    return {
        ipcRenderer
    };
});

describe('todos reducer with add event', () => {

    it('should add event successful', () => {
        let result = todos(undefined, {
            type: 'add',
            todoState: {
                description: 'test todo',
                dueDatetime: 5566,
            }
        });
        expect(result).toEqual([{
            id: '1',
            description: 'test todo',
            dueDatetime: 5566,
            complete: false,
            createTime: 0,
        }]);
    });

});

describe('todos reducer with edit event', () => {

    let todoStates: Array<TodoState> = [
        {
            id: '1',
            description: 'test todo1',
            dueDatetime: 100,
            complete: false,
            createTime: 0,
        },
        {
            id: '2',
            description: 'test todo2',
            dueDatetime: 168,
            complete: true,
            createTime: 1,
        },
    ];

    it('should edit event successful', () => {
        let todoState: TodoState = {
            id: '2',
            description: 'test todo2 edit',
            dueDatetime: 168,
            complete: false,
            createTime: 1,
        };

        let result = todos(todoStates, {
            type: 'edit',
            todoState
        });

        expect(result).toEqual([
            todoStates[0],
            todoState
        ]);
    });

    it('should not edit when edit id not found', () => {
        let todoState: TodoState = {
            id: '4',
            description: 'test todo2 edit',
            dueDatetime: 168,
            complete: false,
            createTime: 1,
        };

        let result = todos(todoStates, {
            type: 'edit',
            todoState
        });
        
        expect(result).toEqual(todoStates);
    });

});

describe('todos reducer with delete event', () => {
    let todoStates: Array<TodoState> = [
        {
            id: '1',
            description: 'test todo1',
            dueDatetime: 100,
            complete: false,
            createTime: 0,
        },
        {
            id: '2',
            description: 'test todo2',
            dueDatetime: 168,
            complete: true,
            createTime: 1,
        },
    ];

    it('should delete event successful', () => {

        let result = todos(todoStates, {
            type: 'delete',
            id: '1',
        });

        expect(result).toEqual([
            todoStates[1],
        ]);
    });

    it('should not delete when delete id not found', () => {
        let result = todos(todoStates, {
            type: 'delete',
            id: '10',
        });

        expect(result).toEqual(todoStates);
    });
});

describe('todos reducer with complete event', () => {
    let todoStates: Array<TodoState> = [
        {
            id: '1',
            description: 'test todo1',
            dueDatetime: 100,
            complete: false,
            createTime: 0,
        },
        {
            id: '2',
            description: 'test todo2',
            dueDatetime: 168,
            complete: true,
            createTime: 1,
        },
    ];

    it('should complete event successful', () => {

        let result = todos(todoStates, {
            type: 'complete',
            id: '1',
        });

        expect(result).toEqual([
            {
                id: '1',
                description: 'test todo1',
                dueDatetime: 100,
                complete: true,
                createTime: 0,
            },
            todoStates[1],
        ]);
    });

    it('should not complete when complete id not found', () => {
        let result = todos(todoStates, {
            type: 'complete',
            id: '10',
        });

        expect(result).toEqual(todoStates);
    });
});