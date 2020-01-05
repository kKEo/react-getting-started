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

const byId = (state = {}, action) => {
    switch(action.type) {
        case 'RECEIVE_TODOS':
            const nextState = { ...state };
            action.response.forEach(todo => {
               nextState[todo.id] = todo;
            });
            return nextState;
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    if (action.filter !== 'all') {
        return state;
    }
    switch (action.type)  {
        case 'RECEIVE_TODOS':
            return action.response.map(todo => todo.id);
        default:
            return state;
    }
};

const activeIds = (state = [], action) => {
    if (action.filter !== 'active') {
        return state;
    }
    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.response.map(todo => todo.id);
        default:
            return state;
    }
};

const completedIds = (state = [], action) => {
    if (action.filter !== 'completed') {
        return state;
    }
    console.log('Action:', action);
    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.response.map(todo => todo.id);
        default:
            return state;
    }
};

const idsByFilter = combineReducers({
    all: allIds,
    active: activeIds,
    completed: completedIds
});

const todoApp = combineReducers({
    byId,
    idsByFilter,
});

export default todoApp;

export const getVisibleTodos = (state, filter) => {
    console.log(state);
    const ids = state.idsByFilter[filter];
    console.log(ids);
    return ids.map(id => state.byId[id]);
};

