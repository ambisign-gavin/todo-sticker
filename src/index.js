import React from 'react';
import ReactDOM from 'react-dom';
import TodosPage from './component/todosPage/todosPage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import '../node_modules/antd/dist/antd.min.css';
import '../node_modules/antd/dist/antd.min.js';
// localStorage.removeItem('todos');
const initStorageData = localStorage.getItem('todos') || '{}';

const store = createStore(rootReducer, JSON.parse(initStorageData));
store.subscribe(() => {
    localStorage.setItem('todos', JSON.stringify(store.getState()));
    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <TodosPage />
    </Provider>,
    document.getElementById('app')
);
