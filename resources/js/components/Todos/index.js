import ReactDOM from "react-dom";
import React from "react";
import {createStore, combineReducers} from "redux";
import {connect, Provider} from "react-redux";

import todoApp from "./Reducers";

let nextTodoId = 0;
const addTodo = (text) => ({
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    });

const setVisibilityFilter = (filter) => ({
        type: 'SET_VISIBILITY_FILTER',
        filter
    });

const toggleTodo = (id) => ({
        type: 'TOGGLE_TODO',
        id
    });

const Link = ({
    active, children, onClick
}) => {
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               onClick();
           }}> {children} </a>

    );
};

const FilterLink = connect (
    (state, ownProps) => ({
        active: ownProps.filter === state.visibilityFilter
    }),
    (dispatch, ownProps) => ({
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    })
) (Link);

const getVisibleTodos = (
    todos, filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
              t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
              t => !t.completed
            );
    }
};

const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li onClick = {onClick}
        style={{
            textDecoration:
                completed ?
                    'line-through' : 'none'
        }}
    >
        {text}
    </li>
);

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo key={todo.id}
                  {...todo}
                  onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

let AddTodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <input ref={ node => input = node } />
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    )
};
AddTodo = connect()(AddTodo);

const Filters = () => (
    <p>
        Show:
        {' '} <FilterLink filter='SHOW_ALL'>All</FilterLink>
        {' '} <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
        {' '} <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
    </p>
);

const VisibleTodoList = connect(
    (state) => ({
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    }),
    (dispatch) => ({
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    })
)(TodoList);

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Filters />
    </div>
);

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);

