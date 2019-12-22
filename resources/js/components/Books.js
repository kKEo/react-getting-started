import React, { Component } from 'react';
import ReactDOM from "react-dom";
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

class Books extends Component {
    render() {
        return (
            <div className="books">
                {list.map(function(item) {
                    return <div>{item.title}</div>;
                })}
            </div>
        );
    }
}
export default Books;

if (document.getElementById('root')) {
    ReactDOM.render(<Books />, document.getElementById('root'));
}
