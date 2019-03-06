//@flow
import React from 'react';
import TodoListWithSortAndFilter from './todoListWithSortAndFilter';
import styled from 'styled-components';
import { TodoEditableModal } from '../component/eventEditModal';
import Translate from '../class/translate';
import { addTodo } from '../actions/todo';
import { connect } from 'react-redux';
import { Button } from 'antd';
import FilterPanel from '../container/filterPanel';
import SortButton from './sortButton';
import { type TodoState } from '../states';
import uniqid from 'uniqid';

type Props = {
    addTodo: (todoState: TodoState) => void,
}

type States = {
    showFilterPanel: boolean,
}

class TodosPage extends React.Component<Props, States> {

    state: States = {
        showFilterPanel: false,
    }

    constructor(props: Props) {
        super(props);
    }

    _handleFilterPanelHide() {
        this.setState({
            showFilterPanel: false
        });
    }

    _handleOpenAddModal() {
        TodoEditableModal.show({
            onSave: (todo: TodoState) => {
                todo.id = uniqid();
                todo.createTime = new Date().getTime();
                todo.complete = false;
                this.props.addTodo(todo);
            },
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
                        <Button 
                            onClick={() => this.setState({showFilterPanel: !this.state.showFilterPanel})}
                        >
                            {Translate.tr('Filter')}
                        </Button>
                        <FilterPanel
                            onHide={this._handleFilterPanelHide.bind(this)}
                            show={this.state.showFilterPanel}
                        />
                    </FilterButtonDiv>
                    <TodoListDiv>
                        <TodoListWithSortAndFilter/>
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

const SortButtonDiv = styled(SortButton)`
    grid-area: sort-btn;
    justify-self: end;
    align-self: end;
    margin-right: 10px;
`;
