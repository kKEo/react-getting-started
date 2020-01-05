import {applyMiddleware, createStore} from "redux";
import todoApp from "./Reducers";
import promise from 'redux-promise';
import { createLogger }  from 'redux-logger';

const configureStore = () => {
    const middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(todoApp,
        applyMiddleware(...middlewares) // returns enhancer
    );
};

export default configureStore;


