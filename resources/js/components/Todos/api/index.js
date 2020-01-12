import {v4} from 'node-uuid';

const index = {
    todos: [
        {
            id: v4(),
            text: 'hey',
            completed: true
        },
        {
            id: v4(),
            text: 'ho',
            completed: true
        },
        {
            id: v4(),
            text: 'let`s go',
            completed: false
        },
    ],
};

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const addTodo = (text) =>
    delay(500).then(() => {
       const todo = {
           id: v4(),
           text,
           completed: false,
       };
        index.todos.push(todo);
       return todo;
    });

export const toggleTodo = (id) =>
    delay(500).then(() => {
       const todo = index.todos.find(t => t.id === id);
       todo.completed = !todo.completed;
       return todo;
    });

export const fetchTodos = (filter) =>
    delay(500).then(() => {
        switch (filter) {
            case 'all':
                return index.todos;
            case 'active':
                return index.todos.filter(t => !t.completed);
            case 'completed':
                return index.todos.filter(t => t.completed);
            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    });
