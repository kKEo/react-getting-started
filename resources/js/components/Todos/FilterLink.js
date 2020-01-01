import React from 'react';
import {Link} from 'react-router-dom';

const FilterLink = ({filter, children}) => (
    <Link
        to={filter === 'all' ? '' : filter}
        activestyle={{
            textDecoration: 'none',
            color: 'black',
        }}
        >
        {children}
    </Link>
);

export const Filters = () => (
    <p>
        Show:
        {' '} <FilterLink filter='all'>All</FilterLink>
        {' '} <FilterLink filter='active'>Active</FilterLink>
        {' '} <FilterLink filter='completed'>Completed</FilterLink>
    </p>
);

