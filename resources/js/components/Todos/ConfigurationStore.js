import {applyMiddleware, createStore} from "redux";
import { createLogger }  from 'redux-logger';
import todoApp from "./Reducers";

const thunk = (store) => (next) => (action) => {
    return typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action);
};

const configureStore = () => {
    const middlewares = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(todoApp,
        applyMiddleware(...middlewares) // returns enhancer
    );
};

export default configureStore;


