import React, { Component } from 'react';
import ReactDOM from "react-dom";
class App extends Component {
    render() {
        const title = 'Welcome to smoggitor first component';
        return (
            <div className="App">
                <h2>{title}</h2>
            </div>
        );
    }
}
export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

