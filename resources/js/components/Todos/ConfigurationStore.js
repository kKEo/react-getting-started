import {loadState, saveState} from './LocalStorage';
import throttle from "lodash/throttle";

import {createStore} from "redux";
import todoApp from "./Reducers";

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue',action);
        const returnValue = rawDispatch;
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
}

const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(rawDispatch);
        }
        return rawDispatch(action);
    };
};

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(
        todoApp, persistedState
    );

    store.dispatch = addLoggingToDispatch(store);

    store.dispatch = addPromiseSupportToDispatch(store);

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        });
    }, 1000));

    return store;
};

export default configureStore;


