// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import TodosPage from './component/todosPage';
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

let todayTimestamp: number = new Date().getTime();

store.getState().todos.forEach((todo: TodoState) => {
    if (todo.complete) {
        return;
    }
    if (todo.dueDatetime <= todayTimestamp) {
        return;
    }
    NotifyServer.instance.addSchedule(todo.id || 'empty', todo.dueDatetime, todo.description);
});

const app = document.getElementById('app');

app && ReactDOM.render(
    <Provider store={store}>
        <TodosPage />
    </Provider>,
    app
);
