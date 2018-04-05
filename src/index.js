// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import TodosPage from './component/todosPage/todosPage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import '../node_modules/antd/dist/antd.min.css';
import '../node_modules/antd/dist/antd.min.js';
import type {TodoState} from './states/index';
import NotifyServer from './class/notify/notifyServer';

// localStorage.removeItem('todos');
const initStorageData = localStorage.getItem('todos') || '{}';
const store = createStore(rootReducer, JSON.parse(initStorageData));
store.subscribe(() => {
    localStorage.setItem('todos', JSON.stringify(store.getState()));
    console.log(store.getState());
});

let notifyServer: NotifyServer = new NotifyServer();

store.getState().todos.map((todo: TodoState) => {
    notifyServer.addSchedule(todo.id || 'empty', todo.dueDatetime, todo.description);
});

ReactDOM.render(
    <Provider store={store}>
        <TodosPage />
    </Provider>,
    document.getElementById('app')
);
