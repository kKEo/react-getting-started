import React from 'react';

import {AddTodo} from './AddTodo';
import {VisibleTodoList} from './TodoList';
import {Filters} from './FilterLink';

export const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Filters />
    </div>
);
