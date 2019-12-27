import React from 'react';

export default class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const {count} = this.state;
        document.title = `Was clicked ${count} times`;
    }

    componentDidUpdate() {
        const {count} = this.state;
        document.title = `Was clicked ${count} times`;
    }

    handleClick() {
        this.setState(state => ({
            count: state.count + 1,
        }));
    }

    render() {
        return (
            <div>
                <p>Was clicked {this.state.count} times</p>
                <button onClick={this.handleClick}>
                    Click me
                </button>
            </div>
        );
    }
}
