import React from 'react';
import Link from './Link';
import renderer from 'react-test-renderer';

it ('renders correctly', () => {
    const tree = renderer
        .create(<Link page="https://centrumrekodziela.pl">Centrum</Link>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
