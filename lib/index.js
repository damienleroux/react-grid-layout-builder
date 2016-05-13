"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BootstrapEditor = exports.connectReactGridLayoutBuilderToEditor = exports.connectReactGridLayoutBuilder = exports.withOpeningDock = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _bootstrapEditor = require("./bootstrapEditor");

var _bootstrapEditor2 = _interopRequireDefault(_bootstrapEditor);

var _connectReactGridLayoutBuilderToEditor2 = require("./connectReactGridLayoutBuilderToEditor");

var _connectReactGridLayoutBuilderToEditor3 = _interopRequireDefault(_connectReactGridLayoutBuilderToEditor2);

var _withOpeningDock2 = require("./components/withOpeningDock");

var _withOpeningDock3 = _interopRequireDefault(_withOpeningDock2);

var _connectReactGridLayoutBuilder2 = require("./connectReactGridLayoutBuilder");

var _connectReactGridLayoutBuilder3 = _interopRequireDefault(_connectReactGridLayoutBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactGridLayoutBuilder = (0, _connectReactGridLayoutBuilderToEditor3.default)(_bootstrapEditor2.default);

exports.withOpeningDock = _withOpeningDock3.default;
exports.connectReactGridLayoutBuilder = _connectReactGridLayoutBuilder3.default;
exports.connectReactGridLayoutBuilderToEditor = _connectReactGridLayoutBuilderToEditor3.default;
exports.BootstrapEditor = _bootstrapEditor2.default;
exports.default = ReactGridLayoutBuilder;