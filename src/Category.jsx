import React from 'react';

import Tag from './Tag.jsx';

const { PropTypes } = React;

const Category = React.createClass({
  propTypes: {
    items: PropTypes.array.isRequired,
    category: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    selectedItem: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
    addNew: PropTypes.bool,
    type: PropTypes.string,
    onAdd: PropTypes.func.isRequired
  },

  onAdd(item) {
    return () => {
      this.props.onAdd({
        category: this.props.category,
        item: item
      });
    };
  },

  onCreateNew(e) {
    e.preventDefault();
    this.onAdd(this.props.input)();
  },

  getItems() {
    let fullMatch = false;
    let items = this.props.items.filter(i => {
      if (i === this.props.input) {
        fullMatch = true;
      }
      return i.indexOf(this.props.input) >= 0;
    });

    items = items.map((item, i) => {
      return (
        <Tag selected={i === this.props.selectedItem && this.props.selected}
          input={this.props.input} text={item} addable={true} deletable={false}
          onAdd={this.onAdd(item)} key={item + '_' + i} />
      );
    });

    return {
      items,
      fullMatch
    };
  },

  getAddBtn(fullMatch, selected) {
    if (this.props.addNew && !fullMatch) {
      return (
        <button className={'cti__category__add-item' + (selected ? ' cti-selected' : '')}
          onClick={this.onCreateNew}>
          {'Create new ' + (this.props.type || this.props.title) + ` "${this.props.input}"`}
        </button>
      );
    }

    return null;
  },

  render() {
    let { items, fullMatch } = this.getItems();
    let addBtn = this.getAddBtn(
      fullMatch,
      items.length === 0 && this.props.selected ||
      this.props.selectedItem >= items.length
    );

    if (items.length === 0 && !this.props.addNew) {
      return null;
    }

    return (
      <div className='cti__category'>
        <h5 className='cti__category__title'>{this.props.title}</h5>
        <div className='cti__category__tags'>
          {items}
          {addBtn}
        </div>
      </div>
    );
  }
});

export default Category;
