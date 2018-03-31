
import React from 'react';
import AddEventButton from '../addButton/addButton';
import TodoListContainer from '../../container/todoListContainer';
import './app.scss';
import FilterButton from '../filterButton/FilterButton';

export default class App extends React.Component {

    render() {
        return (
            <div className="todo-container" >
                App
                <AddEventButton className="add-button" />
                <FilterButton className="filter-button" />
                <div className="lists-area">
                    <TodoListContainer />
                </div>
            </div>
        );
    }
}
