const createList = (filter) => {
    return (state = [], action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'RECEIVE_TODOS':
                return action.response
                    .map(todo => todo.id);
            default:
                console.log('Default state');
                return state;
        }
    }
};

export default createList;

export const getIds = (state) => state;
