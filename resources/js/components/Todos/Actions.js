import {v4 } from 'node-uuid';
import * as api from "./api";
import {getIsFetching} from "./Reducers";

const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter,
});

export const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response,
});

export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)){
        return;
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => {
        dispatch(receiveTodos(filter, response));
    });
};

let nextTodoId = 0;
const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

export {
    addTodo, toggleTodo
}
