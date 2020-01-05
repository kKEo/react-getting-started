import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "./Actions";
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

class VisibleTodoList2 extends Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData () {
        console.log('Fetching data');
        const {filter, receiveTodos} = this.props;
        actions.fetchTodos(filter)
            .then(todos => {
                console.log(filter, todos);
                receiveTodos(filter, todos);
            });
    }

    render () {
        const { toggleTodo, ...rest } = this.props;
        return (
            <TodoList
                {...rest }
                onTodoClick={toggleTodo} />
        );
    }

}

export const VisibleTodoList = connect(
    (state, {filter}) => ({
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

