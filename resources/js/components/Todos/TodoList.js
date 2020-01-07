import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "./Actions";
import FetchError from "./FetchError";
import {
    getVisibleTodos,
    getIsFetching,
    getErrorMessage} from "./Reducers";

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
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter)
            .then(() => console.log('done'));
    }

    render () {
        const {
            isFetching,
            errorMessage,
            toggleTodo,
            todos,
        } = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }
        console.log(this.props);
        if (errorMessage && !todos.length) {

            return (
              <FetchError
                message={errorMessage}
                onRetry={() => this.fetchData()}
                />
            );
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
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
        todos: getVisibleTodos(state, filter),
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

