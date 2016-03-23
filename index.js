import React from 'react';
import ReactDOM from 'react-dom';

import Input from './src/index';

const categories = [
  {
    id: 'animals',
    title: 'Animals',
    type: 'animal',
    items: ['Dog', 'Cat', 'Bird', 'Dolphin', 'Apes']
  },
  {
    id: 'something',
    title: 'Something cool',
    items: ['Something cool'],
    single: true
  },
  {
    id: 'food',
    title: 'food',
    type: 'food',
    items: ['Apple', 'Banana', 'Grapes', 'Pear']
  },
  {
    id: 'professions',
    title: 'Professions',
    type: 'profession',
    items: ['Waiter', 'Writer', 'Hairdresser', 'Policeman']
  }
];

function transformTag(category, item) {
  return `${category}/${item}`;
}

const props = {
  addNew: true,
  categories,
  transformTag,
  value: ['initial'],
  placeholder: "Add a tag",
  onChange(tags) {
    console.log('Changed', tags);
  },
  onBlur() {
    console.log('Blur');
  }
};

const Wrap = React.createClass({
  getInitialState() {
    return {
      editable: true
    };
  },

  toggleEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ editable: !this.state.editable });
  },

  render() {
    return (
      <div>
        <button onClick={this.toggleEdit}>Toggle edit</button>
        {this.state.editable ? <Input {...props} /> : <span>Not editable</span>}
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(Wrap, {}),
  document.getElementById('app')
);
