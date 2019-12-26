import React, {Component} from 'react';
import ReactDOM from "react-dom";
import './css/Books.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const DEFAULT_HPP = '4';

const SEARCH_BASE = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;
const url = `${SEARCH_BASE}${DEFAULT_QUERY}&${PARAM_PAGE}`;

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
        this.onSearchSubmit = this.onSearchSubmit.bind(this);

        this.onDismiss =  (id) => {
            const updatedHits = { hits: this.state.result.hits.filter((item) => item.objectID !== id) };
            const updatedResult = Object.assign({}, this.state.result, updatedHits);
            this.setState({result: updatedResult});
        };

        this.onSearchChange = (event) => {
            this.setState({searchTerm: event.target.value });
        }

        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();

    }

    fetchSearchTopStories(searchTerm, page= 0) {
        const pageQuery = `&${PARAM_PAGE}${page}`;
        const hitsPerPageQuery = `&hitsPerPage=${DEFAULT_HPP}`;
        fetch(`${SEARCH_BASE}${searchTerm}${pageQuery}${hitsPerPageQuery}`)
            .then(resp => resp.json())
            .then(res => this.setSearchTopStories(res))
            .catch(error => error);
    }

    setSearchTopStories(result) {
        const {hits, page} = result;

        const oldHits = page !== 0
            ? this.state.result.hits : [];

        const updatedHits = [ ...oldHits, ...hits];

        this.setState({
            result: { hits: updatedHits, page}
        });
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
    }

    render() {
        const {searchTerm, result} = this.state;
        const page = (result && result.page) || 0;
        return (
            <div className = "page">
                <div className="interactions">
                    <Search value={searchTerm}
                            onChange={this.onSearchChange}
                            onSubmit={this.onSearchSubmit}>
                        Search
                    </Search>
                </div>
                { result ?
                    <Table
                        list={result.hits}
                        onDismiss={this.onDismiss}
                    />
                    : <h5>no items</h5>
                }
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

const Search = ({value, onChange, onSubmit, children}) =>
    <form onSubmit={onSubmit}>
        <input type="text"
               value={value}
               onChange={onChange} />
        <button type="submit">
            {children}
        </button>
    </form>;

const Table = ({list, onDismiss}) =>
    <div className="table">
        {list.map(item => {
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
