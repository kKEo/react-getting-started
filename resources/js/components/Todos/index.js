import ReactDOM from "react-dom";
import React from "react";
import {createStore, combineReducers} from "redux";

const todo = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                    id: action.id,
                    text: action.text,
                    completed: false
                };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            }
    }
};

const todos = (state =[], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))
        default:
            return state;
    }
};

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = combineReducers ({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);
const {Component} = React;

const Link = ({
    active, children, onClick
}) => {
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               onClick(filter);
           }}> {children} </a>

    );
};

class FilterLink extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();

        return (
            <Link active={props.filter === state.visibilityFilter}
                  onClick={() =>
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                  }
            >
                {props.children}
            </Link>
        );
    }
}

const getVisibleTodos = (
    todos, filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
              t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
              t => !t.completed
            );
    }
}

const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li onClick = {onClick}
        style={{
            textDecoration:
                completed ?
                    'line-through' : 'none'
        }}
    >
        {text}
    </li>
);

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo key={todo.id}
                  {...todo}
                  onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

const AddTodo = ({
    onButtonClicked
}) => {
    let input;
    return (
        <div>
            <input ref={ node => input = node } />
            <button onClick={() => {
                onButtonClicked(input.value);
                input.value = '';
            }}>
            Add Todo
            </button>
        </div>
    )
};

const Filters = () => (
    <p>
        Show:
        {' '} <FilterLink filter='SHOW_ALL'>All</FilterLink>
        {' '} <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
        {' '} <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
    </p>
);

let nextTodoId = 0;
const TodoApp = ({
    todos, visibilityFilter
}) => (
    <div>
        <AddTodo
            onButtonClicked={text =>
                store.dispatch({
                    type: 'ADD_TODO',
                    text: text,
                    id: nextTodoId++
                })
            }
        />
        <TodoList
            todos={getVisibleTodos(todos, visibilityFilter)}
            onTodoClick={id => {
                store.dispatch({
                    type: 'TOGGLE_TODO',
                    id
                });
            }}
        />
        <Filters
            visibilityFilter={visibilityFilter}
            onFilterClick={filter =>
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                })
            }
        />
    </div>
);


const render = () => {
    return ReactDOM.render(
        <TodoApp
            {...store.getState()}
        />,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();
