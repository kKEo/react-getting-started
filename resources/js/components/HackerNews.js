import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Books from "./Books";

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class HackerNews extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(url);
    }

    render() {
        return <div className="hackernews">
            <h3>Hacker news</h3>
        </div>
    }
}

export default HackerNews;

if (document.getElementById('root')) {
    ReactDOM.render(<HackerNews />, document.getElementById('root'));
}
