import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdomReact from './jsdomReact';

import Input from '../src/Input.jsx';


function createInput(props) {
  return TestUtils.renderIntoDocument(React.createElement(Input, props));
}

function props(p = {}) {
  return Object.assign({}, {
    tags: ['foo', 'bar'],
    value: 'baz',
    onKeyDown: () => {},
    onTagDeleted: () => {},
    onValueChange: () => {},
    openPanel: () => {},
    closePanel: () => {},
  }, p);
}

function findInput(i) {
  return TestUtils.findRenderedDOMComponentWithClass(i, 'cti__input__input');
}

function findTags(i) {
  return TestUtils.scryRenderedDOMComponentsWithClass(i, 'cti__tag');
}

// TODO: can't test autoresize or focus because JSDom does not implement
// layouting or focus/blur

describe('Input', () => {
  jsdomReact();

  it('should render the given tags and the value', () => {
    let i = createInput(props());
    let tags = findTags(i);
    expect(tags.length).toBe(2);

    let input = findInput(i);
    expect(input.value).toBe(props().value)
  });
});
