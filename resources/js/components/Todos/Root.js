import React from 'react';
import {Provider} from 'react-redux';
import {TodoApp} from "./TodoApp";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route path='/:filter?' >
                        <TodoApp/>
                    </Route>
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default Root;
