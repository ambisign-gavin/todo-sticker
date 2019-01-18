// @flow
import React from 'react';
import { List, Pagination } from 'antd';
import type { TodoState } from '../states';
import TodoItem from './todoItem';
import styled from 'styled-components';

type Props = {
    todoLists: TodoState[]
}

type States = {
    showingTodos: TodoState[]
}

export default class TodoList extends React.Component<Props, States> {

    defaultPaginIndex: number = 1;
    defaultPaginSize: number = 3;

    state: States = {
        showingTodos: []
    }

    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this._handlePageChanged(this.defaultPaginIndex, this.defaultPaginSize);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.todoLists !== this.props.todoLists) {
            this._handlePageChanged(this.defaultPaginIndex, this.defaultPaginSize, nextProps.todoLists);
        }
    }

    _handlePageChanged(page: number, pageSize: number, todos: TodoState[] = this.props.todoLists) {
        let allTodos: TodoState[] = todos;
        let showingTodos: TodoState[] = [];
        let startIndex: number = (page - 1) * pageSize;
        let endIndex: number = (page * pageSize) > allTodos.length? allTodos.length: (page * pageSize);
        for (let i = startIndex; i < endIndex; i++) {
            showingTodos.push(allTodos[i]);
        }
        this.setState({
            showingTodos: showingTodos
        });
    }

    render() {
        return (
            <TodosListDiv>
                <TodosList
                    dataSource={this.state.showingTodos}
                    renderItem={
                        (todo: TodoState) => (
                            <TodoItem todo={todo} />
                        )
                    }
                />
                <ListPagination
                    total={this.props.todoLists.length}
                    defaultPageSize={this.defaultPaginSize}
                    onChange={this._handlePageChanged.bind(this)}
                />
            </TodosListDiv>
        );
    }

}

const TodosListDiv = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 80% 10%;
    grid-template-areas:
    "list"
    "list-pagination";
`;

const ListPagination = styled(Pagination)`
    grid-area: list-pagination;
    justify-self: center;
`;

const TodosList = styled(List)`
    grid-area: list
`;