import React from 'react';
import {Provider} from 'react-redux';
import {TodoApp} from "./TodoApp";
import {Router, Route} from "react-router";
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={customHistory}>
            <Route path='/' component={TodoApp}/>
        </Router>
    </Provider>
);

export default Root;
