import React from 'react';
import { Provider } from 'react-redux';

import {AddTodo} from './AddTodo';
import {VisibleTodoList} from './TodoList';
import {Filters} from './FilterLink';
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Filters />
    </div>
);

const Root = ({store}) => (
    <Provider store={store}>
        <TodoApp/>
    </Provider>
)

export default Root;
