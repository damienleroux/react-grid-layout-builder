'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = BootstrapEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

function InputNumber(props) {
  var name = props.name,
      label = props.label,
      value = props.value,
      min = props.min,
      max = props.max,
      editConfigCallback = props.editConfigCallback,
      addon = props.addon;

  value = value ? value : 0;

  var getValidationState = function getValidationState(value) {
    if (min && value < min) {
      return 'error';
    } else {
      return 'success';
    }

    if (max && value > max) {
      return 'error';
    } else {
      return 'success';
    }
  };

  var onChange = function onChange(event) {
    if (getValidationState(event.target.value) === 'success') {
      editConfigCallback(event);
    }
  };

  return _react2.default.createElement(
    'div',
    { className: 'col' },
    _react2.default.createElement(_TextField2.default, {
      style: { width: "80%" },
      id: name,
      name: name,
      value: value,
      hintText: label,
      floatingLabelText: label,
      type: 'number',
      onChange: onChange
    }),
    addon ? _react2.default.createElement(
      'span',
      null,
      addon
    ) : null
  );
}

function InputNumberGtrThanZero(props) {
  return _react2.default.createElement(InputNumber, _extends({}, props, { min: 1 }));
}

function InputNumberGtrOrEqualToZero(props) {
  return _react2.default.createElement(InputNumber, _extends({}, props, { min: 0 }));
}

function BreakpointInput(props) {
  var name = props.name;

  return _react2.default.createElement(InputNumberGtrOrEqualToZero, _extends({}, props, { name: "breakpoints_" + name, addon: 'px' }));
}

function Breakpoints(props) {
  if (!props.breakpoints) {
    return _react2.default.createElement('div', null);
  }
  var _props$breakpoints = props.breakpoints,
      lg = _props$breakpoints.lg,
      md = _props$breakpoints.md,
      sm = _props$breakpoints.sm,
      xs = _props$breakpoints.xs,
      xxs = _props$breakpoints.xxs;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h4',
      null,
      'Breakpoints'
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(BreakpointInput, { name: 'lg', value: lg, label: 'large', editConfigCallback: props.editConfigCallback }),
      _react2.default.createElement(BreakpointInput, { name: 'md', value: md, label: 'medium', editConfigCallback: props.editConfigCallback }),
      _react2.default.createElement(BreakpointInput, { name: 'sm', value: sm, label: 'small', editConfigCallback: props.editConfigCallback }),
      _react2.default.createElement(BreakpointInput, { name: 'xs', value: xs, label: 'extra small', editConfigCallback: props.editConfigCallback }),
      _react2.default.createElement(BreakpointInput, { name: 'xxs', value: xxs, label: 'extra extra small', editConfigCallback: props.editConfigCallback })
    )
  );
}

function ColInput(props) {
  var name = props.name;

  return _react2.default.createElement(InputNumberGtrThanZero, _extends({}, props, { name: "cols_" + name, addon: 'cols' }));
}

function Cols(props) {
  if (!props.cols) {
    return _react2.default.createElement('div', null);
  }
  var _props$cols = props.cols,
      lg = _props$cols.lg,
      md = _props$cols.md,
      sm = _props$cols.sm,
      xs = _props$cols.xs,
      xxs = _props$cols.xxs;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h4',
      null,
      'Columns'
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(ColInput, { name: 'lg', value: lg, label: 'large', editConfigCallback: props.editConfigCallback }),
      _react2.default.createElement(ColInput, { name: 'md', value: md, label: 'medium', editConfigCallback: props.editConfigCallback }),
      _react2.default.createElement(ColInput, { name: 'sm', value: sm, label: 'small', editConfigCallback: props.editConfigCallback }),
      _react2.default.createElement(ColInput, { name: 'xs', value: xs, label: 'extra small', editConfigCallback: props.editConfigCallback }),
      _react2.default.createElement(ColInput, { name: 'xxs', value: xxs, label: 'extra extra small', editConfigCallback: props.editConfigCallback })
    )
  );
}

function Layouts(props) {
  if (!props.layouts) {
    return _react2.default.createElement('div', null);
  }

  var rowHeight = props.rowHeight,
      isDraggable = props.isDraggable,
      isResizable = props.isResizable,
      autoSize = props.autoSize,
      verticalCompact = props.verticalCompact,
      margin = props.margin;

  //Set with defaultValue if no defined

  rowHeight = rowHeight !== undefined ? rowHeight : 150;
  isDraggable = isDraggable !== undefined ? isDraggable : true;
  isResizable = isResizable !== undefined ? isResizable : true;
  autoSize = autoSize !== undefined ? autoSize : true;
  verticalCompact = verticalCompact !== undefined ? verticalCompact : true;
  var marginX = margin && margin[0] !== undefined ? margin[0] : 10;
  var marginY = margin && margin[1] !== undefined ? margin[1] : 10;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h4',
      null,
      'Layouts'
    ),
    _react2.default.createElement(InputNumberGtrThanZero, { value: rowHeight, label: 'Row Height', editConfigCallback: props.editConfigCallback, name: "rowHeight", addon: 'px' }),
    _react2.default.createElement(
      _MuiThemeProvider2.default,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Checkbox2.default, {
          id: 'isDraggable',
          name: 'isDraggable',
          checked: isDraggable,
          onCheck: props.editConfigCallback,
          label: 'Items are draggable',
          style: styles.checkbox
        }),
        _react2.default.createElement(_Checkbox2.default, {
          id: 'isResizable',
          name: 'isResizable',
          checked: isResizable,
          onCheck: props.editConfigCallback,
          label: 'Items are resizable',
          style: styles.checkbox
        }),
        _react2.default.createElement(_Checkbox2.default, {
          id: 'autoSize',
          name: 'autoSize',
          checked: autoSize,
          onCheck: props.editConfigCallback,
          label: 'The container height swells and contracts to fit contents',
          style: styles.checkbox
        }),
        _react2.default.createElement(_Checkbox2.default, {
          id: 'verticalCompact',
          name: 'verticalCompact',
          checked: verticalCompact,
          onCheck: props.editConfigCallback,
          label: 'The layout will compact vertically',
          style: styles.checkbox
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(InputNumberGtrThanZero, { value: marginX, label: 'Horizontal margin between items', editConfigCallback: props.editConfigCallback, name: "marginX", addon: 'px' }),
      _react2.default.createElement(InputNumberGtrThanZero, { value: marginY, label: 'Vertical margin between items', editConfigCallback: props.editConfigCallback, name: "marginY", addon: 'px' })
    )
  );
}

function BootstrapEditor(props) {
  var _props$reactGridLayou = props.reactGridLayout,
      breakpoints = _props$reactGridLayou.breakpoints,
      cols = _props$reactGridLayou.cols;

  return _react2.default.createElement(
    'form',
    { className: 'reactDashboardBuilderBody', style: { background: "unset" } },
    _react2.default.createElement(
      _MuiThemeProvider2.default,
      null,
      _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(Breakpoints, { breakpoints: breakpoints, editConfigCallback: props.editConfigCallback }),
        _react2.default.createElement(Cols, { cols: cols, editConfigCallback: props.editConfigCallback }),
        _react2.default.createElement(Layouts, _extends({}, props.reactGridLayout, { editConfigCallback: props.editConfigCallback }))
      )
    )
  );
}