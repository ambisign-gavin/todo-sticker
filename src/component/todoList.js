// @flow
import React from 'react';
import { List, Pagination } from 'antd';
import type { TodoState } from '../states';
import TodoItem from './todoItem';
import styled from 'styled-components';

type Props = {
    todos: Array<TodoState>
}

type States = {
    showingTodos: Array<TodoState>
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
        if (nextProps.todos !== this.props.todos) {
            this._handlePageChanged(this.defaultPaginIndex, this.defaultPaginSize, nextProps.todos);
        }
    }

    _handlePageChanged(page: number, pageSize: number, todos: TodoState[] = this.props.todos) {
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
            <TodosListGrid>
                <ListRow
                    dataSource={this.state.showingTodos}
                    renderItem={
                        (todo: TodoState) => (
                            <TodoItem todo={todo} />
                        )
                    }
                />
                <PaginationRow
                    total={this.props.todos.length}
                    defaultPageSize={this.defaultPaginSize}
                    onChange={this._handlePageChanged.bind(this)}
                />
            </TodosListGrid>
        );
    }

}

const TodosListGrid = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 80% 10%;
    grid-template-areas:
    "list"
    "list-pagination";
`;

const PaginationRow = styled(Pagination)`
    grid-area: list-pagination;
    justify-self: center;
`;

const ListRow = styled(List)`
    grid-area: list
`;