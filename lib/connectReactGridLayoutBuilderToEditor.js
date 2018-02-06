"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.connectReactGridLayoutBuilderToEditor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectReactGridLayoutBuilderToEditor = exports.connectReactGridLayoutBuilderToEditor = function connectReactGridLayoutBuilderToEditor(Editor) {
	return function (_Component) {
		_inherits(_class2, _Component);

		function _class2() {
			var _ref;

			var _temp, _this, _ret;

			_classCallCheck(this, _class2);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.editConfigCallback = function (event) {
				if (event) {
					if (event.target) {
						var reactGridLayout = _lodash2.default.cloneDeep(_this.props.reactGridLayout);

						var id = event.target.id;
						var targetValue = event.target.value;
						switch (id) {
							case "isDraggable":
								targetValue = event.target.checked;
								reactGridLayout.isDraggable = targetValue;
								break;
							case "isResizable":
								targetValue = event.target.checked;
								reactGridLayout.isResizable = targetValue;
								break;
							case "autoSize":
								targetValue = event.target.checked;
								reactGridLayout.autoSize = targetValue;
								break;
							case "verticalCompact":
								targetValue = event.target.checked;
								reactGridLayout.verticalCompact = targetValue;
								break;

							case "breakpoints_lg":
							case "breakpoints_md":
							case "breakpoints_sm":
							case "breakpoints_xs":
							case "breakpoints_xxs":
								reactGridLayout.breakpoints[id.replace("breakpoints_", "")] = Number(targetValue);
								break;
							case "cols_lg":
							case "cols_md":
							case "cols_sm":
							case "cols_xs":
							case "cols_xxs":
								reactGridLayout.cols[id.replace("cols_", "")] = Number(targetValue);
								break;
							case "rowHeight":
								reactGridLayout.rowHeight = Number(targetValue);
								break;
							case "marginX":
								if (reactGridLayout.margin) {
									reactGridLayout.margin[0] = Number(targetValue);
								} else {
									reactGridLayout.margin = [Number(targetValue), 10];
								}
								break;
							case "marginY":
								if (reactGridLayout.margin) {
									reactGridLayout.margin[1] = Number(targetValue);
								} else {
									reactGridLayout.margin = [10, Number(targetValue)];
								}
								break;
						}
						_this.props.updateConfigFunc(reactGridLayout);
					}
				}
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(_class2, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(Editor, _extends({ editConfigCallback: this.editConfigCallback }, this.props));
			}
		}]);

		return _class2;
	}(_react.Component);
};

exports.default = connectReactGridLayoutBuilderToEditor;