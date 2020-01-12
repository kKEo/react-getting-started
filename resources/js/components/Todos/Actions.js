import * as api from "./api";
import {getIsFetching} from "./Reducers";

export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }
    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter,
    });
    return api.fetchTodos(filter).then(response => {
        console.log('Response: ', response);
        dispatch({
            type: 'FETCH_TODOS_SUCCESS',
            filter,
            response,
        });
    }, error => {
        console.log('Response:', error);
        dispatch ({
            type: 'FETCH_TODOS_FAILURE',
            filter,
            message: error.message || 'Something went wrong.'
        });
    });
};

const addTodo = (text) => (dispatch) =>
    api.addTodo(text).then(response => {
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            response,
        })
    });

const toggleTodo = (id) => (dispatch) =>
    api.toggleTodo(id).then(response => {
    dispatch({
            type: 'TOGGLE_TODO',
            id,
        });
    });

export {
    addTodo, toggleTodo
}
