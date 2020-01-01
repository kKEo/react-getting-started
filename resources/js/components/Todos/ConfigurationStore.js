import {loadState, saveState} from './LocalStorage';
import throttle from "lodash/throttle";

import {createStore} from "redux";
import todoApp from "./Reducers";

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(
        todoApp, persistedState
    );

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        });
    }, 1000));

    return store;
};

export default configureStore;


