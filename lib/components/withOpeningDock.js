"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withOpeningDock = function withOpeningDock(ComposedComponent) {
  return function (_Component) {
    _inherits(_class2, _Component);

    function _class2() {
      _classCallCheck(this, _class2);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).call(this));

      _this.toggleConfigurator = function () {
        _this.setState({
          builderOpen: !_this.state.builderOpen
        });
      };

      _this.state = {
        builderOpen: false
      };
      return _this;
    }

    _createClass(_class2, [{
      key: "render",
      value: function render() {
        if (!this.state.builderOpen) {
          return _react2.default.createElement(
            "div",
            { className: "reactDashboardBuilderOpener" },
            _react2.default.createElement("i", { className: "fa fa-cog  fa-2x", "aria-hidden": "true", onClick: this.toggleConfigurator })
          );
        }
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(ComposedComponent, _extends({}, this.props, { builderOpen: this.state.builderOpen })),
          _react2.default.createElement(
            "div",
            { className: "reactDashboardBuilderOpener" },
            _react2.default.createElement("i", { className: "fa fa-cog fa-2x", "aria-hidden": "true", onClick: this.toggleConfigurator })
          )
        );
      }
    }]);

    return _class2;
  }(_react.Component);
};
exports.default = withOpeningDock;