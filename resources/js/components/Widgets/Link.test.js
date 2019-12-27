import React from 'react';
import Link from './Link';
import renderer from 'react-test-renderer';

it ('renders correctly', () => {
    const tree = renderer
        .create(<Link page="https://centrumrekodziela.pl">Centrum</Link>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders as an anchor when no page is set', () => {
    const tree = renderer.create(<Link>Facebook</Link>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('properly escapes quotes', () => {
   const tree = renderer
       .create(<Link>{"\"Everythink\" \\'is\\ 'awesome'"}</Link>)
       .toJSON();
   expect(tree).toMatchSnapshot();
});
