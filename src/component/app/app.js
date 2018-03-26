
import React from 'react';
import AddEventContainer from '../../container/addEventContainer';
import TodoListContainer from '../../container/todoListContainer';
import './app.scss';

export default class App extends React.Component {

    render() {
        return (
            <div>
                App
                <AddEventContainer className="float-right-btn" />
                <div className="lists-area">
                    <TodoListContainer />
                </div>
            </div>
        );
    }
}
