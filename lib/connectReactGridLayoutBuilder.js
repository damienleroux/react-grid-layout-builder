"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getReactGridLayoutFromProps(props) {
  var children = props.children,
      updateConfigFunc = props.updateConfigFunc,
      reactGridLayout = _objectWithoutProperties(props, ["children", "updateConfigFunc"]);

  return reactGridLayout;
}
var connectReactGridLayoutBuilder = function connectReactGridLayoutBuilder(ReactGridLayout) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.onDragStart = function (layout, oldItem, newItem, placeholder, e, element) {
        if (_this.props.onDragStart) {
          _this.props.onDragStart(layout, oldItem, newItem, placeholder, e, element);
        }
      }, _this.onDrag = function (layout, oldItem, newItem, placeholder, e, element) {
        if (_this.props.onDrag) {
          _this.props.onDrag(layout, oldItem, newItem, placeholder, e, element);
        }
      }, _this.updateLayoutIfNecessary = function (layout, oldItem, newItem, placeholder, e, element) {

        var reactGridLayout = _lodash2.default.clone(getReactGridLayoutFromProps(_this.props));
        var areSameItem = function areSameItem(itemA, itemB) {
          return itemA.i === itemB.i;
        };
        if (reactGridLayout.layout) {
          reactGridLayout.layout = _lodash2.default.map(reactGridLayout.layout, function (item) {
            if (areSameItem(item, oldItem)) {
              //remove option set by react-grid-layout
              var ret = _lodash2.default.clone(newItem);
              ret.moved = undefined;
              return ret;
            }
            return item;
          });
        }
        if (reactGridLayout.layouts) {
          _lodash2.default.forEach(reactGridLayout.layouts, function (layout, key) {
            reactGridLayout.layouts[key] = _lodash2.default.map(layout, function (item) {
              if (areSameItem(item, oldItem)) {
                //remove option set by react-grid-layout
                var ret = _lodash2.default.clone(newItem);
                ret.moved = undefined;
                return ret;
              }
              return item;
            });
          });
        }
        return reactGridLayout;
      }, _this.onDragStop = function (layout, oldItem, newItem, placeholder, e, element) {
        if (_this.props.onDragStop) {
          _this.props.onDragStop(layout, oldItem, newItem, placeholder, e, element);
        }
        var reactGridLayout = _this.updateLayoutIfNecessary(layout, oldItem, newItem, placeholder, e, element);
        _this.props.updateConfigFunc(reactGridLayout);
      }, _this.onResizeStart = function (layout, oldItem, newItem, placeholder, e, element) {
        if (_this.props.onResizeStart) {
          _this.props.onResizeStart(layout, oldItem, newItem, placeholder, e, element);
        }
      }, _this.onResize = function (layout, oldItem, newItem, placeholder, e, element) {
        if (_this.props.onResize) {
          _this.props.onResize(layout, oldItem, newItem, placeholder, e, element);
        }
      }, _this.onResizeStop = function (layout, oldItem, newItem, placeholder, e, element) {
        if (_this.props.onResizeStop) {
          _this.props.onResizeStop(layout, oldItem, newItem, placeholder, e, element);
        }
        var reactGridLayout = _this.updateLayoutIfNecessary(layout, oldItem, newItem, placeholder, e, element);
        _this.props.updateConfigFunc(reactGridLayout);
      }, _this.onWidthChange = function (containerWidth, margin, cols) {
        if (_this.props.onWidthChange) {
          _this.props.onWidthChange(containerWidth, margin, cols);
        }
      }, _this.onBreakpointChange = function (newBreakpoint, newCols) {
        if (_this.props.onBreakpointChange) {
          _this.props.onBreakpointChange(newBreakpoint, newCols);
        }
      }, _this.onLayoutChange = function (currentLayout, allLayouts) {
        var reactGridLayout = _lodash2.default.clone(getReactGridLayoutFromProps(_this.props));
        if (_this.props.onLayoutChange) {
          _this.props.onLayoutChange(currentLayout, allLayouts);
        }
        if (reactGridLayout.layouts) {
          reactGridLayout.layouts = allLayouts;
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // Calls when drag starts.

    // Calls on forEach drag movement.

    // Calls when drag is complete.

    // Calls when resize starts.

    // Calls when resize movement happens.

    // Calls when resize is complete.

    // Callback when the width changes, so you can modify the layout as needed.

    // Calls back with breakpoint and new # cols


    // Callback so you can save the layout.
    // AllLayouts are keyed by breakpoint.


    _createClass(_class, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            children = _props.children,
            updateConfigFunc = _props.updateConfigFunc,
            reactGridLayout = _objectWithoutProperties(_props, ["children", "updateConfigFunc"]);

        //avoid immutability issue to keep control on reactGridLayout future modifications


        reactGridLayout = _lodash2.default.cloneDeep(reactGridLayout);
        return _react2.default.createElement(
          ReactGridLayout,
          _extends({}, reactGridLayout, {
            onDragStart: this.onDragStart,
            onDrag: this.onDrag,
            onDragStop: this.onDragStop,
            onResizeStart: this.onResizeStart,
            onResize: this.onResize,
            onResizeStop: this.onResizeStop,
            onWidthChange: this.onWidthChange,
            onBreakpointChange: this.onBreakpointChange,
            onLayoutChange: this.onLayoutChange
          }),
          children
        );
      }
    }]);

    return _class;
  }(_react.Component), _class.propTypes = _lodash2.default.assign({}, ReactGridLayout.propTypes, {
    updateConfigFunc: _propTypes2.default.func.isRequired
  }), _temp2;
};
exports.default = connectReactGridLayoutBuilder;