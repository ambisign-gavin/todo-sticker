import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './component/hello';
import AddEventContainer from './container/addEventContainer';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

const store = createStore(rootReducer);
store.subscribe(() => {console.log(store.getState())});

ReactDOM.render(
    <Provider store={store}>
        <AddEventContainer />
    </Provider>,
    document.getElementById("app")
)