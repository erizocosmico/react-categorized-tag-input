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

function transformTag(tag) {
  const categoryMatches = categories.filter(category => category.id === tag.category);
  const categoryTitle = categoryMatches[0].title;
  return `${categoryTitle}/${tag.title}`;
}


function getTagStyle(tag){
  if (tag.title === "rhino") {
    return {
      base: {
        backgroundColor: "gray",
        color: "lightgray"
      }
    }
    return {}
  }
}

function getCreateNewText(title, text){
  return `create new ${title} "${text}"`
}

const Wrap = React.createClass({
  getInitialState() {
    return {
      editable: true,
      tags: [{
        title: "rhino",
        category: 'animals'
      }]
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
        {this.state.editable
                      ? <Input
                          addNew={true}
                          categories={categories}
                          getTagStyle={getTagStyle}
                          value={this.state.tags}
                          placeholder="Add a tag"
                          onChange={(tags) => {
                            console.log('Changed', tags);
                            this.setState({tags});
                          }}
                          onBlur={() => {
                            console.log('Blur');
                          }}
                          transformTag={transformTag}
                          getCreateNewText={getCreateNewText}
                        /> 
                      : <span>Not editable</span>}
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(Wrap, {}),
  document.getElementById('app')
);
