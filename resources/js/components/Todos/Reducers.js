import {combineReducers} from "redux";

const todo = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            }
    }
};

const todos = (state =[], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) => {
    console.log('Filter: ', filter);
    switch (filter) {
        case 'all':
            return state.todos;
        case 'completed':
            return state.todos.filter(t => t.completed);
        case 'active':
            return state.todos.filter(t => !t.completed);
    }
};
