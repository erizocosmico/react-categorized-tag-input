import React from 'react';

import Input from './Input.jsx';
import Panel from './Panel.jsx';
import * as key from './keyboard';

const { PropTypes } = React;

// TODO: Validate categories on componentWillMount

const CategorizedTagInput = React.createClass({
  propTypes: {
    addNew: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    transformTag: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.string),
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  },

  getInitialState() {
    return {
      value: '',
      selection: {
        item: 0,
        category: 0
      },
      panelOpened: false,
      tags: this.props.value || [],
      categories: [],
      addNew: this.props.addNew === undefined ? true : this.props.addNew
    };
  },

  filterCategories(input) {
    let categories = this.props.categories.map(c => {
      c = Object.assign({}, c, {
        items: c.items.filter(this.filterItems(input))
      });
      return (c.items.length === 0 && (!this.state.addNew || c.single)) ? null : c;
    }).filter(c => c !== null);

    let selection = this.state.selection;
    if (this.state.selection.category >= categories.length) {
      selection = {
        category: 0,
        item: 0
      };
    } else {
      if (selection.item >= categories[selection.category].items.length) {
        selection.item = 0;
      }
    }

    this.setState({
      categories,
      selection
    });
  },

  filterItems(input) {
    return function (i) {
      return i.toLowerCase().indexOf(input.trim().toLowerCase()) >= 0;
    };
  },

  openPanel() {
    this.setState({ panelOpened: true });
  },

  closePanel() {
    setTimeout(() => {
      this.setState({ panelOpened: false });
    }, 150);
  },

  onValueChange(e) {
    let value = e.target.value;
    this.setState({ value, panelOpened: value.trim().length > 0 });
    this.filterCategories(value);
  },

  onTagDeleted(i) {
    let newTags = this.state.tags.slice(0, i)
      .concat(this.state.tags.slice(i+1));
    this.setState({
      tags: newTags
    });

    this.props.onChange(newTags);
  },

  onAdd(newTag) {
    let { category, item } = newTag;
    if (typeof this.props.transformTag === 'function') {
      item = this.props.transformTag(category, item);
    }

    let newTags = this.state.tags.concat([item]);
    this.setState({
      tags: newTags,
      value: '',
      panelOpened: true
    });

    this.refs.input.focusInput();
    this.props.onChange(newTags);
  },

  addSelectedTag() {
    let category = this.state.categories[this.state.selection.category];
    let item = category.items[this.state.selection.item];
    this.onAdd({
      category: category.id,
      item: item || this.state.value
    });
  },

  onKeyDown(e) {
    let result;
    switch (e.keyCode) {
    case key.TAB:
    case key.ENTER:
    case key.COMMA:
      e.preventDefault();
      this.addSelectedTag();
      break;
    case key.BACKSPACE:
      if (this.state.value.trim().length === 0) {
        e.preventDefault();
        this.onTagDeleted(this.state.tags.length - 1);
      }
      break;
    case key.LEFT:
      result = this.state.selection.item - 1;
      this.setState({selection: {
        category: this.state.selection.category,
        item: result >= 0 ? result : 0
      }});
      break;
    case key.UP:
      result = this.state.selection.category - 1;
      this.setState({selection: {
        category: result >= 0 ? result : 0,
        item: 0
      }});
      break;
    case key.RIGHT:
      result = this.state.selection.item + 1;
      let cat = this.state.categories[this.state.selection.category];
      this.setState({selection: {
        category: this.state.selection.category,
        item: result <= cat.items.length ? result : cat.items.length
      }});
      break;
    case key.DOWN:
      result = this.state.selection.category + 1;
      let cats = this.state.categories;
      this.setState({selection: {
        category: result < cats.length ? result : cats.length - 1,
        item: 0
      }});
      break;
    }
  },

  value() {
    return this.state.tags;
  },

  render() {
    return (
      <div className='cti__root'>
        <Input openPanel={this.openPanel} closePanel={this.closePanel}
          onValueChange={this.onValueChange} onTagDeleted={this.onTagDeleted}
          onKeyDown={this.onKeyDown} value={this.state.value}
          tags={this.state.tags} onBlur={this.props.onBlur} ref='input' />
        {this.state.panelOpened && this.state.value.length > 0 ? <Panel categories={this.state.categories}
          selection={this.state.selection} onAdd={this.onAdd}
          input={this.state.value}
          addNew={this.props.addNew === undefined ? true : this.props.addNew} /> : ''}
      </div>
    );
  }
});

export default CategorizedTagInput;
