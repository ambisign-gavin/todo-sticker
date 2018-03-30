// @flow
import React from 'react';

type Props = {
    todoId: number,
    handleDeleteTodo: (id: number) => void,
}

export default ({handleDeleteTodo, todoId}: Props) => (
    <a onClick={() => handleDeleteTodo(todoId)} >delete</a>
);
