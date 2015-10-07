import expect from 'expect';
import React from 'react/addons';
import jsdomReact from './jsdomReact';

import Category from '../src/Category.jsx';

const { TestUtils } = React.addons;

function category(props) {
  return TestUtils.renderIntoDocument(React.createElement(Category, props));
}

function props(p = {}) {
  return Object.assign({}, {
    items: ['foo', 'bar', 'baz', 'foobarbaz'],
    input: 'fo',
    title: 'Things',
    selected: true,
    selectedItem: 1,
    addNew: true,
    type: 'thing',
    category: 1,
    onAdd: () => {}
  }, p);
}

function findAddBtn(c) {
  return TestUtils.findRenderedDOMComponentWithClass(c, 'cti__category__add-item');
}

function findTags(c) {
  return TestUtils.scryRenderedDOMComponentsWithClass(c, 'cti__tag');
}

describe('Category', () => {
  jsdomReact();

  describe('when addNew is true', () => {
    it('should show the add new button', () => {
      let c = category(props());
      let btn = findAddBtn(c);

      expect(btn).toNotBe(undefined);
      expect(btn.getDOMNode().innerHTML).toBe('Create new thing "fo"');
    });

    describe('and is a full match', () => {
      it('there should be no add new button', () => {
        let c = category(props({ input: 'foo' }));
        expect(() => {
          let btn = findAddBtn(c);
        }).toThrow(/.*/);
      });
    });
  });

  describe('when addNew is false', () => {
    it('there should be no add new button', () => {
      let c = category(props({ addNew: false }));
      expect(() => {
        let btn = findAddBtn(c);
      }).toThrow(/.*/);
    });
  });

  it('should only show the items that match the input', () => {
    let c = category(props());
    let tags = findTags(c);
    expect(tags.length).toBe(2);
    expect(tags[0].getDOMNode().textContent).toBe('foo');
    expect(tags[1].getDOMNode().textContent).toBe('foobarbaz');

    c = category(props({ input: 'bar' }));
    tags = findTags(c);
    expect(tags.length).toBe(2);
    expect(tags[0].getDOMNode().textContent).toBe('bar');
    expect(tags[1].getDOMNode().textContent).toBe('foobarbaz');

    c = category(props({ input: 'ksajdfhskjf' }));
    tags = findTags(c);
    expect(tags.length).toBe(0);
  });

  describe('when there are no matching elements', () => {
    describe('and addNew is true', () => {
      it('should not show any tags, just the new button', () => {
        let c = category(props({ input: 'asd' }));
        expect(findTags(c).length).toBe(0);
        let btn = findAddBtn(c);
        expect(btn).toNotBe(undefined);
        expect(btn.getDOMNode().innerHTML).toBe('Create new thing "asd"');
      });
    });

    describe('and addNew is false', () => {
      it('should render nothing', () => {
        let c = category(props({ input: 'asd', addNew: false }));
        expect(c.getDOMNode()).toBe(null);
      });
    });
  });

  describe('when a tag is clicked', () => {
    it('should trigger onAdd with category and item', done => {
      let c = category(props({
        onAdd(o) {
          expect(o.category).toBe(1);
          expect(o.item).toBe('foo');
          done();
        }
      }));
      let tags = findTags(c);
      TestUtils.Simulate.click(tags[0].getDOMNode());
    });
  });

  describe('when category is selected', () => {
    function isSelected(elem) {
      return elem.getDOMNode().className.split(' ')[1] === 'cti-selected';
    }

    describe('and an item is selected', () => {
      it('should have a selected class', () => {
        let c = category(props());
        let tags = findTags(c);
        expect(isSelected(tags[0])).toBe(false);
        expect(isSelected(tags[1])).toBe(true);
      });
    });

    describe('and the selected item is bigger than the number of elements', () => {
      it('should select the create button', () => {
        let c = category(props({ selectedItem: 2 }));
        let tags = findTags(c);
        expect(isSelected(tags[0])).toBe(false);
        expect(isSelected(tags[1])).toBe(false);

        expect(isSelected(findAddBtn(c))).toBe(true);
      });
    });

    describe('and there is no matched item', () => {
      it('should select the create button', () => {
        let c = category(props({ selectedItem: 0, input: 'asd' }));
        expect(isSelected(findAddBtn(c))).toBe(true);
      });
    });
  });
});
