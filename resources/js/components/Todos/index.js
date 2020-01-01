import ReactDOM from "react-dom";
import React from "react";
import {createStore, combineReducers} from "redux";
import {connect, Provider} from "react-redux";

import todoApp from "./Reducers";
import {AddTodo} from './AddTodo';
import {VisibleTodoList} from './TodoList';
import {Filters} from './FilterLink';

import {loadState, saveState} from './LocalStorage';

const persistedState = loadState();
const store = createStore(
  todoApp, persistedState
);

store.subscribe(() => {
    saveState({
        todos: store.getState().todos
    });
})

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Filters />
    </div>
);

ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);

