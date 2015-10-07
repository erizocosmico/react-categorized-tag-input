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
        items: ['foo', 'bar', 'baz'],
        title: 'Things',
        type: 'thing'
      },
      {
        id: 2,
        items: ['oof', 'rab', 'zab'],
        title: 'Reversed things',
        type: 'reversed thing'
      }
    ],
    selection: { category: 2, item: 1 },
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

  describe('when addNew is false', () => {
    describe('and at only one category has matches', () => {
      it('should render just one category', () => {
        let p = panel(props({ addNew: false }));
        expect(findCategories(p).length).toBe(1);
      });
    });
  });
});
