import ReactDOM from "react-dom";
import React from "react";

import Root from "./Root";
import configureStore from './ConfigurationStore';

const store = configureStore();

ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
);

