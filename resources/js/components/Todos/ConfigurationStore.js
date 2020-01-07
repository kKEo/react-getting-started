import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import { createLogger }  from 'redux-logger';
import todoApp from "./Reducers";


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


