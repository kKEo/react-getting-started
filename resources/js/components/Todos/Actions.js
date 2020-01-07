import {v4} from 'node-uuid';
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
