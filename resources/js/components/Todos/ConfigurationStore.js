import {createStore} from "redux";
import todoApp from "./Reducers";

const logger = (store) => (next) => {
    if (!console.group) {
        return next;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next;
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

const promise = (store) => (next) => (action) => {
    if (typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
};

const wrapDispatchWithMiddlewares = (store, middleware) => {
    middleware.slice().reverse().forEach (middleware =>
        store.dispatch = middleware(store)
    );
};

const configureStore = () => {
    const store = createStore(todoApp);
    const middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    wrapDispatchWithMiddlewares(store, middlewares);

    return store;
};

export default configureStore;


