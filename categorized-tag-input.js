(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["CategorizedTagInput"] = factory(require("react"));
	else
		root["CategorizedTagInput"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _CategorizedTagInputJsx = __webpack_require__(3);
	
	var _CategorizedTagInputJsx2 = _interopRequireDefault(_CategorizedTagInputJsx);

	exports['default'] = _CategorizedTagInputJsx2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var PropTypes = _react2['default'].PropTypes;
	
	var Tag = _react2['default'].createClass({
	  displayName: 'Tag',
	
	  propTypes: {
	    selected: PropTypes.bool,
	    input: PropTypes.string.isRequired,
	    text: PropTypes.string.isRequired,
	    addable: PropTypes.bool,
	    deletable: PropTypes.bool,
	    onAdd: PropTypes.func,
	    onDelete: PropTypes.func
	  },
	
	  tagContent: function tagContent() {
	    var content = [];
	    var startIndex = this.props.text.trim().toLowerCase().indexOf(this.props.input.trim().toLowerCase());
	    var endIndex = startIndex + this.props.input.length;
	
	    if (startIndex > 0) {
	      content.push(_react2['default'].createElement(
	        'span',
	        { key: 1, className: 'cti__tag__content--regular' },
	        this.props.text.substring(0, startIndex)
	      ));
	    }
	
	    content.push(_react2['default'].createElement(
	      'span',
	      { key: 2, className: 'cti__tag__content--match' },
	      this.props.text.substring(startIndex, endIndex)
	    ));
	
	    if (endIndex < this.props.text.length) {
	      content.push(_react2['default'].createElement(
	        'span',
	        { key: 3, className: 'cti__tag__content--regular' },
	        this.props.text.substring(endIndex)
	      ));
	    }
	
	    return content;
	  },
	
	  onClick: function onClick(e) {
	    e.preventDefault();
	    if (this.props.addable) {
	      this.props.onAdd(e);
	    }
	  },
	
	  onDelete: function onDelete(e) {
	    // Prevents onClick event of the whole tag from being triggered
	    e.preventDefault();
	    e.stopPropagation();
	    this.props.onDelete(e);
	  },
	
	  render: function render() {
	    var deleteBtn = null;
	    if (this.props.deletable) {
	      deleteBtn = _react2['default'].createElement('button', { className: 'cti__tag__delete', onClick: this.onDelete,
	        dangerouslySetInnerHTML: { __html: '&times;' } });
	    }
	    var cls = 'cti__tag' + (this.props.selected ? ' cti-selected' : '');
	
	    return _react2['default'].createElement(
	      'div',
	      { className: cls, onClick: this.onClick },
	      _react2['default'].createElement(
	        'div',
	        { className: 'cti__tag__content' },
	        this.tagContent()
	      ),
	      deleteBtn
	    );
	  }
	});
	
	exports['default'] = Tag;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InputJsx = __webpack_require__(5);
	
	var _InputJsx2 = _interopRequireDefault(_InputJsx);
	
	var _PanelJsx = __webpack_require__(6);
	
	var _PanelJsx2 = _interopRequireDefault(_PanelJsx);
	
	var _keyboard = __webpack_require__(7);
	
	var key = _interopRequireWildcard(_keyboard);
	
	var PropTypes = _react2['default'].PropTypes;
	
	// TODO: Validate categories on componentWillMount
	
	var CategorizedTagInput = _react2['default'].createClass({
	  displayName: 'CategorizedTagInput',
	
	  propTypes: {
	    addNew: PropTypes.bool,
	    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
	    transformTag: PropTypes.func
	  },
	
	  getInitialState: function getInitialState() {
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
	
	  filterCategories: function filterCategories(input) {
	    var _this = this;
	
	    var categories = this.props.categories.map(function (c) {
	      c = Object.assign({}, c, {
	        items: c.items.filter(_this.filterItems(input))
	      });
	      return c.items.length === 0 && !_this.state.addNew ? null : c;
	    }).filter(function (c) {
	      return c !== null;
	    });
	
	    var selection = this.state.selection;
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
	      categories: categories,
	      selection: selection
	    });
	  },
	
	  filterItems: function filterItems(input) {
	    return function (i) {
	      return i.toLowerCase().indexOf(input.trim().toLowerCase()) >= 0;
	    };
	  },
	
	  openPanel: function openPanel() {
	    this.setState({ panelOpened: true });
	  },
	
	  closePanel: function closePanel() {
	    this.setState({ panelOpened: false });
	  },
	
	  onValueChange: function onValueChange(e) {
	    var value = e.target.value;
	    this.setState({ value: value, panelOpened: value.trim().length > 0 });
	    this.filterCategories(value);
	  },
	
	  onTagDeleted: function onTagDeleted(i) {
	    this.setState({
	      tags: this.state.tags.slice(0, i).concat(this.state.tags.slice(i + 1))
	    });
	  },
	
	  onAdd: function onAdd(newTag) {
	    var category = newTag.category;
	    var item = newTag.item;
	
	    if (typeof this.props.transformTag === 'function') {
	      item = this.props.transformTag(category, item);
	    }
	    this.setState({
	      tags: this.state.tags.concat([item]),
	      value: '',
	      panelOpened: false
	    });
	  },
	
	  addSelectedTag: function addSelectedTag() {
	    this.onAdd(this.state.categories[this.state.selection.category].items[this.state.selection.item]);
	  },
	
	  onKeyDown: function onKeyDown(e) {
	    var result = undefined;
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
	        this.setState({ selection: {
	            category: this.state.selection.category,
	            item: result >= 0 ? result : 0
	          } });
	        break;
	      case key.UP:
	        result = this.state.selection.category - 1;
	        this.setState({ selection: {
	            category: result >= 0 ? result : 0,
	            item: this.state.selection.item
	          } });
	        break;
	      case key.RIGHT:
	        result = this.state.selection.item + 1;
	        var cat = this.state.categories[this.state.selection.category];
	        this.setState({ selection: {
	            category: this.state.selection.category,
	            item: result >= cat.items.length ? result : cat.items.length - 1
	          } });
	        break;
	      case key.DOWN:
	        result = this.state.selection.category + 1;
	        var cats = this.state.categories;
	        this.setState({ selection: {
	            category: result >= cats.length ? result : cats.length - 1,
	            item: this.state.selection.item
	          } });
	        break;
	    }
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'cti__root' },
	      _react2['default'].createElement(_InputJsx2['default'], { openPanel: this.openPanel, closePanel: this.openPanel,
	        onValueChange: this.onValueChange, onTagDeleted: this.onTagDeleted,
	        onKeyDown: this.onKeyDown, value: this.state.value,
	        tags: this.state.tags }),
	      this.state.panelOpened ? _react2['default'].createElement(_PanelJsx2['default'], { categories: this.state.categories,
	        selection: this.state.selection, onAdd: this.onAdd,
	        input: this.state.value,
	        addNew: this.props.addNew === undefined ? true : this.props.addNew }) : ''
	    );
	  }
	});
	
	exports['default'] = CategorizedTagInput;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TagJsx = __webpack_require__(2);
	
	var _TagJsx2 = _interopRequireDefault(_TagJsx);
	
	var PropTypes = _react2['default'].PropTypes;
	
	var Category = _react2['default'].createClass({
	  displayName: 'Category',
	
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
	
	  onAdd: function onAdd(item) {
	    var _this = this;
	
	    return function () {
	      _this.props.onAdd({
	        category: _this.props.category,
	        item: item
	      });
	    };
	  },
	
	  onCreateNew: function onCreateNew(e) {
	    e.preventDefault();
	    this.onAdd(this.props.input)();
	  },
	
	  getItems: function getItems() {
	    var _this2 = this;
	
	    var fullMatch = false;
	    for (var i = 0, len = this.props.items.length; i < len; i++) {
	      if (this.props.items[i] === this.props.input) {
	        fullMatch = true;
	        break;
	      }
	    }
	
	    var items = this.props.items.map(function (item, i) {
	      return _react2['default'].createElement(_TagJsx2['default'], { selected: i === _this2.props.selectedItem && _this2.props.selected,
	        input: _this2.props.input, text: item, addable: true, deletable: false,
	        onAdd: _this2.onAdd(item), key: item + '_' + i });
	    });
	
	    return {
	      items: items,
	      fullMatch: fullMatch
	    };
	  },
	
	  getAddBtn: function getAddBtn(fullMatch, selected) {
	    if (this.props.addNew && !fullMatch) {
	      return [_react2['default'].createElement(
	        'span',
	        { className: 'cti__category__or' },
	        'or'
	      ), _react2['default'].createElement(
	        'button',
	        { className: 'cti__category__add-item' + (selected ? ' cti-selected' : ''),
	          onClick: this.onCreateNew },
	        'Create new ' + (this.props.type || this.props.title) + (' "' + this.props.input + '"')
	      )];
	    }
	
	    return null;
	  },
	
	  render: function render() {
	    var _getItems = this.getItems();
	
	    var items = _getItems.items;
	    var fullMatch = _getItems.fullMatch;
	
	    var addBtn = this.getAddBtn(fullMatch, (items.length === 0 || this.props.selectedItem >= items.length) && this.props.selected);
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'cti__category' },
	      _react2['default'].createElement(
	        'h5',
	        { className: 'cti__category__title' },
	        this.props.title
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: 'cti__category__tags' },
	        items,
	        addBtn
	      )
	    );
	  }
	});
	
	exports['default'] = Category;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TagJsx = __webpack_require__(2);
	
	var _TagJsx2 = _interopRequireDefault(_TagJsx);
	
	var PropTypes = _react2['default'].PropTypes;
	
	var Input = _react2['default'].createClass({
	  displayName: 'Input',
	
	  propTypes: {
	    openPanel: PropTypes.func.isRequired,
	    closePanel: PropTypes.func.isRequired,
	    onValueChange: PropTypes.func.isRequired,
	    onTagDeleted: PropTypes.func.isRequired,
	    onKeyDown: PropTypes.func.isRequired,
	    value: PropTypes.string.isRequired,
	    tags: PropTypes.arrayOf(PropTypes.string).isRequired
	  },
	
	  focusInput: function focusInput() {
	    this.refs.input.getDOMNode().focus();
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.resizeInput();
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    this.resizeInput();
	  },
	
	  resizeInput: function resizeInput() {
	    var node = this.refs.input.getDOMNode();
	    node.style.width = node.scrollWidth + 8 + 'px';
	  },
	
	  getTags: function getTags() {
	    var _this = this;
	
	    return this.props.tags.map(function (t, i) {
	      return _react2['default'].createElement(_TagJsx2['default'], { selected: false, input: t, text: t, addable: false,
	        deletable: true, key: t + '_' + i,
	        onDelete: function () {
	          return _this.props.onTagDeleted(i);
	        } });
	    });
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'cti__input', onClick: this.focusInput },
	      _react2['default'].createElement(
	        'div',
	        { className: 'cti__input__tags' },
	        this.getTags()
	      ),
	      _react2['default'].createElement('input', { type: 'text', ref: 'input', value: this.props.value,
	        onFocus: this.props.openPanel, onBlur: this.props.closePanel,
	        onChange: this.props.onValueChange, onKeyDown: this.props.onKeyDown,
	        className: 'cti__input__input' })
	    );
	  }
	});
	
	exports['default'] = Input;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CategoryJsx = __webpack_require__(4);
	
	var _CategoryJsx2 = _interopRequireDefault(_CategoryJsx);
	
	var PropTypes = _react2['default'].PropTypes;
	
	var Panel = _react2['default'].createClass({
	  displayName: 'Panel',
	
	  propTypes: {
	    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
	    selection: PropTypes.object.isRequired,
	    onAdd: PropTypes.func.isRequired,
	    input: PropTypes.string.isRequired,
	    addNew: PropTypes.bool
	  },
	
	  getCategories: function getCategories() {
	    var _this = this;
	
	    return this.props.categories.map(function (c, i) {
	      return _react2['default'].createElement(_CategoryJsx2['default'], { key: c.id, items: c.items, category: c.id, title: c.title,
	        selected: _this.props.selection.category === i,
	        selectedItem: _this.props.selection.item,
	        input: _this.props.input, addNew: _this.props.addNew,
	        type: c.type, onAdd: _this.props.onAdd });
	    });
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'cti__panel' },
	      this.getCategories()
	    );
	  }
	});
	
	exports['default'] = Panel;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TAB = 9;
	exports.TAB = TAB;
	var ENTER = 13;
	exports.ENTER = ENTER;
	var BACKSPACE = 8;
	exports.BACKSPACE = BACKSPACE;
	var LEFT = 37;
	exports.LEFT = LEFT;
	var UP = 38;
	exports.UP = UP;
	var RIGHT = 39;
	exports.RIGHT = RIGHT;
	var DOWN = 40;
	exports.DOWN = DOWN;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=categorized-tag-input.js.map