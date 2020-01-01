import React from 'react';

import {AddTodo} from './AddTodo';
import {VisibleTodoList} from './TodoList';
import {Filters} from './FilterLink';

export const TodoApp = ({params}) => (
    <div>
        <AddTodo />
        <VisibleTodoList
            filter={params.filter || 'all'}/>
        <Filters />
    </div>
);
