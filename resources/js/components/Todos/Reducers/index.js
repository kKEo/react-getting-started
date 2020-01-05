import {combineReducers} from "redux";

import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

// const todo = (state, action) => {
//     switch(action.type) {
//         case 'ADD_TODO':
//             return {
//                 id: action.id,
//                 text: action.text,
//                 completed: false
//             };
//         case 'TOGGLE_TODO':
//             if (state.id !== action.id) {
//                 return state;
//             }
//             return {
//                 ...state,
//                 completed: !state.completed
//             }
//     }
// };

const idsByFilter = combineReducers({
    all: createList('all'),
    active: createList('active'),
    completed: createList('completed')
});

const todoApp = combineReducers({
    byId,
    idsByFilter,
});

export default todoApp;

export const getVisibleTodos = (state, filter) => {
    console.log ('Ids by filter', state.idsByFilter[filter], filter);
    let ids = fromList.getIds(state.idsByFilter[filter]);
    console.log(ids);
    ids = ids.map(id => fromById.getTodo(state.byId, id));
    console.log(ids);
    return ids;
};

