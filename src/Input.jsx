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
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    getTagStyle: PropTypes.func,
    transformTag: PropTypes.func,
    inputClass: PropTypes.string,
    inputAutoSize: PropTypes.bool
  },

  focusInput() {
    this.refs.input.focus();
  },

  getDefaultProps() {
      return {
          getTagStyle(tag) {
            // empty style object by default
            return {};
          },
          transformTag(tag){
            return tag.title;
          }
      };
  },

  getTags() {

    return this.props.tags.map((tag, i) => {
      return (
        <Tag selected={false} input='' text={this.props.transformTag(tag)} addable={false}
          deletable={true} key={tag.title + '_' + i}
          onDelete={() => this.props.onTagDeleted(i)}
          style={this.props.getTagStyle(tag)}/>
      );
    });
  },

  onBlur(e) {
    this.props.closePanel();
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  },

  render() {
    const placeholder = this.props.placeholder || '';
    let extraProps = {};

    if (this.props.inputAutoSize){
        extraProps["size"] = (this.props.value.length === 0 ?
          placeholder.length :
          this.props.value.length) + 2
    }

    return (
      <div className='cti__input' onClick={this.focusInput}>
        {this.getTags()}
        <input type='text' ref='input' value={this.props.value}
          {...extraProps}
          onFocus={this.props.openPanel} onBlur={this.onBlur}
          onChange={this.props.onValueChange} onKeyDown={this.props.onKeyDown}
          placeholder={placeholder} aria-label={placeholder}
          className={this.props.inputClass === undefined ? 'cti__input__input' : this.props.inputClass} />
        <div className='cti__input__arrow' />
      </div>
    );
  }
});

export default Input;
