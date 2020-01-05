import {combineReducers} from "redux";

import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
    all: createList('all'),
    active: createList('active'),
    completed: createList('completed')
});

const todoApp = combineReducers({
    byId,
    listByFilter: listByFilter,
});

export default todoApp;

export const getVisibleTodos = (state, filter) => {
    let ids = fromList.getIds(state.listByFilter[filter]);
    return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
    fromList.getIsFetching(state.listByFilter[filter]);


