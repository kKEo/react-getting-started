import React, {Component} from 'react';
import ReactDOM from "react-dom";

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const SEARCH_BASE = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;
const url = `${SEARCH_BASE}${DEFAULT_QUERY}`;

const onDismiss = item => this.onDismiss(item);
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class HackerNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
        };

        this.setSearchTopStories = this.setSearchTopStories.bind(this);

        this.onDismiss =  (id) => {
            const updatedHits = { hits: this.state.result.hits.filter((item) => item.objectID !== id) };
            const updatedResult = Object.assign({}, this.state.result, updatedHits);
            this.setState({result: updatedResult});
        };

        this.onSearchChange = (event) => {
            this.setState({searchTerm: event.target.value });
        }
    }

    setSearchTopStories(result) {
        this.setState({result});
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        fetch(`${SEARCH_BASE}${searchTerm}`)
            .then(resp => resp.json())
            .then(res => this.setSearchTopStories(res))
            .catch(error => error);
    }

    render() {
        const {searchTerm, result} = this.state;
        if (!result) {return null;}
        return (
            <div className = "page">
                <div className="interactions">
                    <Search value={searchTerm}
                            onChange={this.onSearchChange} >
                        Search
                    </Search>
                </div>

                <Table
                    list={result.hits}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

const Search = ({value, onChange, children}) =>
    <form>
        {children} <input type="text"
                          value={value}
                          onChange={onChange} />
    </form>;

const Table = ({list, pattern, onDismiss}) =>
    <div className="table">
        {list.filter(isSearched(pattern))
            .map(item => {
                return (
                    <div key={item.objectID} className="table-row">
                        <span style={{width: '40%'}}>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span style={{width: '30%'}}>{item.author}</span>
                        <span style={{width: '10%'}}> {item.num_comments}</span>
                        <span style={{width: '10%'}}>{item.points}</span>
                        <span style={{width: '10%'}}>
                            <Button onClick={() => onDismiss(item.objectID)}
                                    className="button-inline">Dismiss</Button>
                        </span>
                    </div>
                )
            })}
    </div>;

const Button = ({ onClick, className = '', children }) =>
    <button onClick={onClick}
            className={className}
            type="button">
        {children}
    </button>;

export default HackerNews;

if (document.getElementById('root')) {
    ReactDOM.render(<HackerNews />, document.getElementById('root'));
}
