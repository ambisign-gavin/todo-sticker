//@flow

import React from 'react';
import AddEventButton from '../addButton/addButton';
import TodoListContainer from '../../container/todoListContainer';
import './app.scss';
import FilterButton from '../filterButton/FilterButton';
import FilterPanelContainer from '../../container/FilterPanelContainer';
import SortButtonContainer from '../../container/sortButtonContainer';

type Props = {

}

type States = {
    showPanel: boolean,
}

export default class App extends React.Component<Props, States> {

    handlePanelHidden: Function;

    state: States = {
        showPanel: false,
    }

    constructor(props: Props) {
        super(props);
        this.handlePanelHidden = this.handlePanelHidden.bind(this);
    }

    handlePanelHidden() {
        this.setState({
            showPanel: false
        });
    }

    render() {
        return (
            <div className="todo-container" >
                App
                <AddEventButton className="add-button" />
                <div className="filter-button">
                    <FilterButton onClick={() => this.setState({showPanel: !this.state.showPanel})}  />
                    <FilterPanelContainer onHidden={this.handlePanelHidden} show={this.state.showPanel} />
                </div>
                <div className="lists-area">
                    <TodoListContainer />
                </div>

                <div className="sort-btn">
                    <SortButtonContainer style={{display: 'inline'}} sortType={''}/>
                </div>
            </div>
        );
    }
}
