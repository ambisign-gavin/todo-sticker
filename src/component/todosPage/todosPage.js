//@flow

import React from 'react';
import AddEventButton from '../addButton/addButton';
import TodoListContainer from '../../container/todoListContainer';
import './todosPage.scss';
import FilterButton from '../filterButton/FilterButton';
import FilterPanelContainer from '../../container/FilterPanelContainer';
import SortButtonContainer from '../../container/sortButtonContainer';

type Props = {

}

type States = {
    showPanel: boolean,
}

export default class TodosPage extends React.Component<Props, States> {

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
        let toolBar = (
            <div className="tool-bar"><AddEventButton className="add-btn" /></div>
        );

        return (
            <div className="todo-container" >
                {toolBar}
                <div className="todos-view" >
                    <div className="filter-button">
                        <FilterButton onClick={() => this.setState({showPanel: !this.state.showPanel})}  />
                        <FilterPanelContainer onHidden={this.handlePanelHidden} show={this.state.showPanel} />
                    </div>
                    <div className="lists-area">
                        <TodoListContainer />
                    </div>

                    <div className="sort-btn">
                        <SortButtonContainer style={{display: 'inline'}}/>
                    </div>
                </div>
            </div>
        );
    }
}
