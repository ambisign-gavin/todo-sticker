import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import '../node_modules/antd/dist/antd.min.css';
import '../node_modules/antd/dist/antd.min.js';

const store = createStore(rootReducer);
store.subscribe(() => {console.log(store.getState());});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);