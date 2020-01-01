import ReactDOM from "react-dom";
import React from "react";

import configureStore from './ConfigurationStore';
import Root from "./Root";

const store = configureStore();

ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
);

