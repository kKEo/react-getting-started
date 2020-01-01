import React from 'react';

import {AddTodo} from './AddTodo';
import {VisibleTodoList} from './TodoList';
import {Filters} from './FilterLink';

import {useParams} from 'react-router-dom';

export const TodoApp = () => {
    let {filter} = useParams();
    return (
        <div>
            <AddTodo />
            <VisibleTodoList
                filter={filter || 'all'}/>
            <Filters />
        </div>
    );
}
