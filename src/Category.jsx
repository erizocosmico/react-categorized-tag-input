import React from 'react';

import Tag from './Tag.jsx';

import PropTypes from 'prop-types';

const getCreateNewText = (title, text) => `Create new ${title} "${text}"`

const Category = React.createClass({
  propTypes: {
    items: PropTypes.array.isRequired,
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    selectedItem: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
    addNew: PropTypes.bool,
    type: PropTypes.string,
    onAdd: PropTypes.func.isRequired,
    single: PropTypes.bool,
    getTagStyle: PropTypes.func,
    getCreateNewText: PropTypes.func
  },

  onAdd(title) {
    return () => {
      this.props.onAdd({
        category: this.props.category,
        title: title
      });
    };
  },

  onCreateNew(e) {
    e.preventDefault();
    this.onAdd(this.props.input)();
  },

  getTagStyle(item) {
    return this.props.getTagStyle ? this.props.getTagStyle(item) : {}
  },

  itemToTag(item, i) {
    return (
      <Tag selected={this.isSelected(i)}
        input={this.props.input} text={item} addable={true} deletable={false}
        onAdd={this.onAdd(item)} key={item + '_' + i} style={this.getTagStyle(item)} />
    );
  },

  fullMatchInItems() {
    for (let i = 0, len = this.props.items.length; i < len; i++) {
      if (this.props.items[i] === this.props.input) {
        return true;
      }
    }
    return false;
  },

  getItems() {
    return {
      items: this.props.items.map(this.itemToTag),
      fullMatch: this.fullMatchInItems(),
    };
  },

  isSelected(i) {
    return this.props.selected &&
      (i === this.props.selectedItem || this.props.single);
  },

  getAddBtn(fullMatch, selected) {
    const title = this.props.type || this.props.title;
    const text = this.props.input;
    const getText = this.props.getCreateNewText || getCreateNewText;
    if (this.props.addNew && !fullMatch && !this.props.single) {
      return [
        this.props.items.length > 0 ?
          <span key='cat_or' className='cti__category__or'>or</span> :
          null,
        <button
          key='add_btn'
          className={'cti__category__add-item' + (selected ? ' cti-selected' : '')}
          onClick={this.onCreateNew}
          >{getText(title, text)}</button>
      ];
    }

    return null;
  },

  render() {
    let { items, fullMatch } = this.getItems();
    let addBtn = this.getAddBtn(
      fullMatch,
      (items.length === 0 || this.props.selectedItem >= items.length) &&
      this.props.selected
    );

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
