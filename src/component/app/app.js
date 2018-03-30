
import React from 'react';
import AddEventButton from '../addButton/addButton';
import TodoListContainer from '../../container/todoListContainer';
import './app.scss';

export default class App extends React.Component {

    render() {
        return (
            <div>
                App
                <AddEventButton className="float-right-btn" />
                <div className="lists-area">
                    <TodoListContainer />
                </div>
            </div>
        );
    }
}
