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

    constructor(props) {
        super(props);

        this.state = {
            list,
        };

        this.onDismiss =  (id) => {
            console.log("onDismiss: " + id);
            const updatedList = this.state.list.filter((item) => item.objectID !== id);
            console.log(updatedList);
            this.setState({list: updatedList});
            console.log(this.state.list);
        };
    }

    render() {
        return (
            <div className="books">
                {this.state.list.map(item =>
                        <div key={item.objectID}>
                            <span>{item.objectID}</span>
                            <span><a href={item.url}>{item.title}</a></span>
                            <span>{item.author}</span>
                            <span>{item.num_comments}</span>
                            <span>{item.points}</span>
                            <span>
                                <button onClick={()=>this.onDismiss(item.objectID)}
                                        type="button">Dismiss</button>
                            </span>
                        </div>
                )}
            </div>
        );
    }
}
export default Books;

if (document.getElementById('root')) {
    ReactDOM.render(<Books />, document.getElementById('root'));
}
