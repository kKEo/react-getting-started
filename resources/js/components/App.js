import React, { Component } from 'react';
import ReactDOM from "react-dom";
class App extends Component {
    render() {
        return (
            <div className="App">
                <h2>Welcome to smoggitor first component</h2>
            </div>
        );
    }
}
export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

