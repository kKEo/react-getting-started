import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "./Actions";
import * as api from "./api";
import {getVisibleTodos, getIsFetching} from "./Reducers";

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

class VisibleTodoList2 extends Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        console.log('Fetching data');
        const {filter, requestTodos, receiveTodos} = this.props;
        requestTodos(filter);
        api.fetchTodos(filter)
            .then(todos => {
                console.log(filter, todos);
                receiveTodos(filter, todos);
            });
    }

    render () {
        const { toggleTodo, todos, isFetching } = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }
        return (
            <TodoList
                todos = {todos}
                onTodoClick={toggleTodo} />
        );
    }

}

export const VisibleTodoList = connect(
    (state, {filter}) => ({
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }),
    actions
    // expands to:
    // (dispatch) => ({
    //     onTodoClick: (id) => {
    //         dispatch(toggleTodo(id))
    //     }
    // })
)(VisibleTodoList2);

