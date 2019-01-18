//@flow

import React from 'react';
import TodoListContainer from './todoListContainer';
import FilterButton from '../component/filterButton';
import FilterPanelContainer from './filterPanelContainer';
import SortButtonContainer from './sortButtonContainer';
import styled from 'styled-components';
import { TodoEditableModal } from '../component/eventEditModal';
import Translate from '../class/translate';
import { addTodo } from '../actions';
import { connect } from 'react-redux';

type Props = {
    addTodo: () => void,
}

type States = {
    showPanel: boolean,
}

class TodosPage extends React.Component<Props, States> {

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

    _handleOpenAddModal() {
        TodoEditableModal.show({
            onSave: this.props.addTodo,
            title: Translate.tr('Add Event'),
        });
    }

    render() {
        let toolBar = (
            <ToolBar>
                <AddButton onClick={this._handleOpenAddModal.bind(this)} >
                    <span className="glyphicon glyphicon-plus-sign"></span>
                </AddButton>
            </ToolBar>
        );

        return (
            <TodosContainer>
                {toolBar}
                <TodosView>
                    <FilterButtonDiv>
                        <FilterButton onClick={() => this.setState({showPanel: !this.state.showPanel})}  />
                        <FilterPanelContainer onHidden={this.handlePanelHidden} show={this.state.showPanel} />
                    </FilterButtonDiv>
                    <TodoListDiv>
                        <TodoListContainer />
                    </TodoListDiv>

                    <SortButtonDiv style={{display: 'inline'}}/>
                </TodosView>
            </TodosContainer>
        );
    }
}

const mapDispatchToProps = {
    addTodo
};

export default connect(
    null,
    mapDispatchToProps
)(TodosPage);

const TodosContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 10% 70% 20%;
    grid-template-rows: 10% 90%;
    grid-row-gap: 5%;
    grid-template-areas:
    "tool-bar tool-bar tool-bar"
    "todos-view todos-view todos-view";
    background-color: #d8d8d8;
`;

const AddButton = styled.div`
    align-self: center;
    margin-right: 10px;
    font-size: 38px !important;
    cursor: pointer;
    &:hover {
        color: #6494c4;
    }
`;
AddButton.displayName = 'AddButton';

const ToolBar = styled.div`
    grid-area: tool-bar;
    display: flex;
    justify-content: flex-end;
    background-color: #fcfcfc;
    box-shadow: 0px 5px 15px #a5a5a5;
`;

const TodosView = styled.div`
    grid-area: todos-view;
    display: grid;
    width: 95%;
    height: 90%;
    justify-self: center;
    align-self: start;
    grid-row-gap: 10px;
    grid-template-columns: 10% 70% 20%;
    grid-template-rows: 10% 90%;
    grid-template-areas:
    "filterButton sort-btn sort-btn"
    "listArea listArea listArea";
    background-color: #fcfcfc;
`;

const FilterButtonDiv = styled.div`
    grid-area: filterButton;
    align-self: end;
    margin-left: 10px;
`;

const TodoListDiv = styled.div`
    grid-area: listArea;
`;

const SortButtonDiv = styled(SortButtonContainer)`
    grid-area: sort-btn;
    justify-self: end;
    align-self: end;
    margin-right: 10px;
`;