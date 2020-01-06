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

export const fetchTodos = (filter) =>
    delay(5000).then(() => {
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
