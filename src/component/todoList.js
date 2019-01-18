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
    page: number,
}

const COUNT_PER_PAGE = 3;

export default class TodoList extends React.Component<Props, States> {

    state: States = {
        page: 1,
    }

    constructor(props: Props) {
        super(props);
    }

    _handlePageChanged(page: number) {
        this.setState({
            page,
        });
    }

    _generateShowingTodos(page: number, todos: Array<TodoState> = this.props.todos): Array<TodoState> {
        let allTodos: Array<TodoState> = todos;
        let showingTodos: Array<TodoState> = [];
        let startIndex: number = (page - 1) * COUNT_PER_PAGE;
        let endIndex: number = (page * COUNT_PER_PAGE) > allTodos.length? allTodos.length: (page * COUNT_PER_PAGE);
        for (let i = startIndex; i < endIndex; i++) {
            showingTodos.push(allTodos[i]);
        }
        return showingTodos;
    }

    render() {

        const {
            page
        } = this.state;

        const {
            todos
        } = this.props;

        let showingTodos = this._generateShowingTodos(page, todos);

        return (
            <TodosListGrid>
                <ListRow
                    dataSource={showingTodos}
                    renderItem={
                        (todo: TodoState) => (
                            <TodoItem todo={todo} />
                        )
                    }
                />
                <PaginationRow
                    total={todos.length}
                    defaultPageSize={COUNT_PER_PAGE}
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