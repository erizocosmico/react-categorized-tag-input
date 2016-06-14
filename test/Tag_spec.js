import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdomReact from './jsdomReact';

import Tag from '../src/Tag.jsx';

function tag(props) {
  return TestUtils.renderIntoDocument(React.createElement(Tag, props));
}

function findContentSpans(t) {
  return TestUtils.scryRenderedDOMComponentsWithTag(t, 'span');
}

function props(props) {
  return Object.assign({}, {
    input: 'foo',
    text: 'fooable',
  }, props);
}

describe('Tag', () => {
  jsdomReact();

  describe('with the input at the start', () => {
    it('should have two spans, the first is the match', () => {
      let t = tag({
        input: 'foo',
        text: 'fooable',
      });

      let spans = findContentSpans(t);
      expect(spans.length).toBe(2);
      expect(spans[0].className).toBe('cti__tag__content--match');
      expect(spans[0].innerHTML).toBe('foo');
      expect(spans[1].className).toBe('cti__tag__content--regular');
      expect(spans[1].innerHTML).toBe('able');
    });
  });

  describe('with the input at the middle', () => {
    it('should have three spans, the second is the match', () => {
      let t = tag({
        input: 'oab',
        text: 'fooable',
      });

      let spans = findContentSpans(t);
      expect(spans.length).toBe(3);
      expect(spans[0].className).toBe('cti__tag__content--regular');
      expect(spans[0].innerHTML).toBe('fo');
      expect(spans[1].className).toBe('cti__tag__content--match');
      expect(spans[1].innerHTML).toBe('oab');
      expect(spans[2].className).toBe('cti__tag__content--regular');
      expect(spans[2].innerHTML).toBe('le');
    });
  });

  describe('with the input at the end', () => {
    it('should have two spans, the last is the match', () => {
      let t = tag({
        input: 'able',
        text: 'fooable',
      });

      let spans = findContentSpans(t);
      expect(spans.length).toBe(2);
      expect(spans[0].className).toBe('cti__tag__content--regular');
      expect(spans[0].innerHTML).toBe('foo');
      expect(spans[1].className).toBe('cti__tag__content--match');
      expect(spans[1].innerHTML).toBe('able');
    });
  });

  describe('if the tag is addable', () => {
    it('should trigger onAdd callback', done => {
      let added = false;
      let t = tag(props({
        addable: true,
        onAdd: () => {
          added = true;
        }
      }));

      TestUtils.Simulate.click(ReactDOM.findDOMNode(t));

      setImmediate(() => {
        expect(added).toBe(true);
        done();
      });
    });
  });

  describe('if the tag is deletable', () => {
    function findDelete(t) {
      return TestUtils.findRenderedDOMComponentWithClass(t, 'cti__tag__delete')
        ;
    }

    it('should trigger onDelete callback', done => {
      let deleted = false;
      let t = tag(props({
        deletable: true,
        onDelete: () => {
          deleted = true;
        }
      }));

      TestUtils.Simulate.click(findDelete(t));

      setImmediate(() => {
        expect(deleted).toBe(true);
        done();
      });
    });

    describe('and addable', () => {
      it('should trigger onDelete callback but not onAdd', done => {
        let added = false;
        let deleted = false;
        let t = tag(props({
          addable: true,
          deletable: true,
          onAdd: () => {
            added = true;
          },
          onDelete: () => {
            deleted = true;
          }
        }));

        TestUtils.Simulate.click(findDelete(t));

        setImmediate(() => {
          expect(added).toBe(false);
          expect(deleted).toBe(true);
          done();
        });
      });
    });
  });

  describe('when is selected', () => {
    it('should have the class cti-selected', () => {
      let t = tag(props({
        selected: true
      }));

      expect(ReactDOM.findDOMNode(t).className.split(' ')[1]).toBe('cti-selected');
    });
  });

  describe('when a getTagStyle func is provided', () => {
    it('should apply the correct styles', () => {
      const style = {
        base: {
          color: "red"
        },
        content: {
          color: "green"
        },
        "delete": {
          color: "blue"
        }
      }
      
      const t = tag(props({
        style
      }))

      const domNode = ReactDOM.findDOMNode(t)
      expect(domNode.style.color).toBe("red")

    })
  })
});
