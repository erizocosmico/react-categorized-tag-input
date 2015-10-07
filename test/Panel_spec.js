import expect from 'expect';
import React from 'react/addons';
import jsdomReact from './jsdomReact';

import Panel from '../src/Panel.jsx';

const { TestUtils } = React.addons;

function panel(props) {
  return TestUtils.renderIntoDocument(React.createElement(Panel, props));
}

function findCategories(p) {
  return TestUtils.scryRenderedDOMComponentsWithClass(p, 'cti__category');
}

function props(p = {}) {
  return Object.assign({}, {
    categories: [
      {
        id: 1,
        items: ['rabbit'],
        title: 'Things',
        type: 'thing'
      },
      {
        id: 2,
        items: ['rab'],
        title: 'Reversed things',
        type: 'reversed thing'
      }
    ],
    selection: { category: 1, item: 1 },
    onAdd: () => {},
    input: 'ra',
    addNew: true
  }, p);
}

describe('Panel', () => {
  jsdomReact();

  it('should render categories', () => {
    let p = panel(props());
    expect(findCategories(p).length).toBe(2);
  });

  it('should select the corresponding item', () => {
    let p = panel(props());
    let selected = TestUtils.scryRenderedDOMComponentsWithClass(p, 'cti-selected');
    expect(selected.length).toBe(1);
    expect(selected[0].getDOMNode().textContent).toBe('Create new reversed thing "ra"');
  });
});
