import React from 'react';

import Input from './src/index';

const categories = [
  {
    id: 'animals',
    title: 'Animals',
    type: 'animal',
    items: ['Dog', 'Cat', 'Bird', 'Dolphin', 'Apes']
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

const props = {
  addNew: true,
  categories,
  onChange: () => {},
  onBlur: () => {}
};

React.render(
  React.createElement(Input, props),
  document.getElementById('wrap')
);

setTimeout(() => {
  let elem = document.querySelector('.cti__input__input');
  elem.focus();
}, 1000);
