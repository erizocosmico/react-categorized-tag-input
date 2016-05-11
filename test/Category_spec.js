import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdomReact from './jsdomReact';

import Category from '../src/Category.jsx';


function category(props) {
  return TestUtils.renderIntoDocument(React.createElement(Category, props));
}

function props(p = {}) {
  return Object.assign({}, {
    items: ['foo', 'foobarbaz'],
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
      expect(btn.innerHTML).toBe('Create new thing "fo"');
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
    expect(tags[0].textContent).toBe('foo');
    expect(tags[1].textContent).toBe('foobarbaz');

    c = category(props({ input: 'bar', items: ['bar', 'foobarbaz'] }));
    tags = findTags(c);
    expect(tags.length).toBe(2);
    expect(tags[0].textContent).toBe('bar');
    expect(tags[1].textContent).toBe('foobarbaz');

    c = category(props({ input: 'ksajdfhskjf', items: [] }));
    tags = findTags(c);
    expect(tags.length).toBe(0);
  });

  describe('when there are no matching elements', () => {
    describe('and addNew is true', () => {
      it('should not show any tags, just the new button', () => {
        let c = category(props({ input: 'asd', items: [] }));
        expect(findTags(c).length).toBe(0);
        let btn = findAddBtn(c);
        expect(btn).toNotBe(undefined);
        expect(btn.innerHTML).toBe('Create new thing "asd"');
      });
      it('should generate a message using getCreateNewText if provided', () => {
        const getCreateNewText = (title, text) => `Hacer nuevo ${title} "${text}"`
        const c = category(props({ input: 'asd', items: [], getCreateNewText}));
        expect(findTags(c).length).toBe(0);
        const btn = findAddBtn(c);
        expect(btn).toNotBe(undefined);
        expect(btn.innerHTML).toBe('Hacer nuevo thing "asd"');
      });
    });
  });

  describe('when a tag is clicked', () => {
    it('should trigger onAdd with category and title', done => {
      let c = category(props({
        onAdd(o) {
          expect(o.category).toBe(1);
          expect(o.title).toBe('foo');
          done();
        }
      }));
      let tags = findTags(c);
      TestUtils.Simulate.click(tags[0]);
    });
  });

  describe('when category is selected', () => {
    function isSelected(elem) {
      return elem.className.split(' ')[1] === 'cti-selected';
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
        let c = category(props({ selectedItem: 0, items: [], input: 'asd' }));
        expect(isSelected(findAddBtn(c))).toBe(true);
      });
    });
  });
});
