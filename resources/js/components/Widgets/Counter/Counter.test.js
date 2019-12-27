import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';
import Counter from '.';

let container;

beforeEach(() => {
   container = document.createElement('div');
   document.body.appendChild(container);
});

afterEach(() =>{
   document.body.removeChild(container);
   container = null;
});

it('can render and update counter', () => {
    act(() => {
       ReactDOM.render(<Counter/>, container);
    });
    const button = container.querySelector('button');
    const label = container.querySelector('p');

    expect(label.textContent).toBe('Was clicked 0 times');
    expect(document.title).toBe('Was clicked 0 times');

    act(() => {
       button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(label.textContent).toBe('Was clicked 1 times');
    expect(document.title).toBe('Was clicked 1 times');
});
