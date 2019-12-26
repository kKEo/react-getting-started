import React, { Component } from 'react';
import ReactDOM from "react-dom";

import './css/Books.css';

const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

const onDismiss = (item) => this.onDismiss(item);
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = {
    width: '40%',
};
const midColumn = {
    width: '30%',
};
const smallColumn = {
    width: '10%',
};

class Books extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list,
            searchTerm: '',
        };

        this.onDismiss =  (id) => {
            console.log("onDismiss: " + id);
            const updatedList = this.state.list.filter((item) => item.objectID !== id);
            console.log(updatedList);
            this.setState({list: updatedList});
            console.log(this.state.list);
        };

        this.onSearchChange = (event) => {
            this.setState({searchTerm: event.target.value });
        }
    };

    render() {
        const {searchTerm, list} = this.state;
        return (
            <div className="books">
                <div className="interactions">
                    <Search value={searchTerm}
                            onChange={this.onSearchChange} >
                        Search
                    </Search>
                </div>
                <Table list={list}
                       pattern={searchTerm}
                       onDismiss={this.onDismiss} />
            </div>
        );
    }
}

const Search = ({value, onChange, children}) =>
    <form>
        {children} <input type="text"
               value={value}
               onChange={onChange} />
    </form>

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
    </div>

const Button = ({ onClick, className = '', children }) =>
    <button onClick={onClick}
            className={className}
            type="button">
        {children}
    </button>

export default Books;

if (document.getElementById('root')) {
    ReactDOM.render(<Books />, document.getElementById('root'));
}
