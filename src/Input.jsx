import React from 'react';

import Tag from './Tag.jsx';

const { PropTypes } = React;

const Input = React.createClass({
  propTypes: {
    openPanel: PropTypes.func.isRequired,
    closePanel: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onTagDeleted: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  },

  focusInput() {
    this.refs.input.getDOMNode().focus();
  },

  resizeInput() {
    let node = this.refs.input.getDOMNode();
    node.style.width = (node.scrollWidth + 8) + 'px';
  },

  getTags() {
    return this.props.tags.map((t, i) => {
      return (
        <Tag selected={false} input='' text={t} addable={false}
          deletable={true} key={t + '_' + i}
          onDelete={() => this.props.onTagDeleted(i)} />
      );
    });
  },

  render() {
    return (
      <div className='cti__input' onClick={this.focusInput}>
        <div className='cti__input__tags'>
          {this.getTags()}
        </div>
        <input type='text' ref='input' value={this.props.value}
          size={this.props.value.length + 2}
          onFocus={this.props.openPanel} onBlur={this.props.closePanel}
          onChange={this.props.onValueChange} onKeyDown={this.props.onKeyDown}
          className='cti__input__input' />
      </div>
    );
  }
});

export default Input;
