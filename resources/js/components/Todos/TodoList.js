import React from 'react';
import {connect} from "react-redux";
import {toggleTodo} from "./Actions";
import {getVisibleTodos} from './Reducers';

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

export const VisibleTodoList = connect(
    (state, {filter}) => ({
        todos: getVisibleTodos(state, filter)
    }),
    { onTodoClick: toggleTodo }
    // expands to:
    // (dispatch) => ({
    //     onTodoClick: (id) => {
    //         dispatch(toggleTodo(id))
    //     }
    // })
)(TodoList);
