import React from 'react';
import {connect} from "react-redux";
import {setVisibilityFilter} from "./Actions";

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
               onClick();
           }}> {children} </a>

    );
};

const FilterLink = connect (
    (state, ownProps) => ({
        active: ownProps.filter === state.visibilityFilter
    }),
    (dispatch, ownProps) => ({
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    })
) (Link);

export const Filters = () => (
    <p>
        Show:
        {' '} <FilterLink filter='SHOW_ALL'>All</FilterLink>
        {' '} <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
        {' '} <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
    </p>
);

