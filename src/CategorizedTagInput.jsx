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
    transformTag: PropTypes.func
  },

  getInitialState() {
    return {
      value: '',
      selection: {
        item: 0,
        category: 0
      },
      panelOpened: false,
      tags: [],
      categories: [],
      addNew: this.props.addNew === undefined ? true : this.props.addNew
    };
  },

  filterCategories(input) {
    let categories = this.props.categories.map(c => {
      c = Object.assign({}, c, {
        items: c.items.filter(this.filterItems(input))
      });
      return (c.items.length === 0 && !this.state.addNew) ? null : c;
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
    this.setState({ panelOpened: false });
  },

  onValueChange(e) {
    let value = e.target.value;
    this.setState({ value, panelOpened: value.trim().length > 0 });
    this.filterCategories(value);
  },

  onTagDeleted(i) {
    this.setState({
      tags: this.state.tags.slice(0, i).concat(this.state.tags.slice(i+1))
    });
  },

  onAdd(newTag) {
    let { category, item } = newTag;
    if (typeof this.props.transformTag === 'function') {
      item = this.props.transformTag(category, item);
    }
    this.setState({
      tags: this.state.tags.concat([item]),
      value: '',
      panelOpened: false
    });
  },

  addSelectedTag() {
    this.onAdd(this.state.categories[this.state.selection.category]
      .items[this.state.selection.item]);
  },

  onKeyDown(e) {
    let result;
    switch (e.keyCode) {
    case key.TAB:
    case key.ENTER:
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
        item: this.state.selection.item
      }});
      break;
    case key.RIGHT:
      result = this.state.selection.item + 1;
      let cat = this.state.categories[this.state.selection.category];
      this.setState({selection: {
        category: this.state.selection.category,
        item: result >= cat.items.length ? result : cat.items.length - 1
      }});
      break;
    case key.DOWN:
      result = this.state.selection.category + 1;
      let cats = this.state.categories;
      this.setState({selection: {
        category: result >= cats.length ? result : cats.length - 1,
        item: this.state.selection.item
      }});
      break;
    }
  },

  render() {
    return (
      <div className='cti__root'>
        <Input openPanel={this.openPanel} closePanel={this.openPanel}
          onValueChange={this.onValueChange} onTagDeleted={this.onTagDeleted}
          onKeyDown={this.onKeyDown} value={this.state.value}
          tags={this.state.tags} />
        {this.state.panelOpened ? <Panel categories={this.state.categories}
          selection={this.state.selection} onAdd={this.onAdd}
          input={this.state.value}
          addNew={this.props.addNew === undefined ? true : this.props.addNew} /> : ''}
      </div>
    );
  }
});

export default CategorizedTagInput;
