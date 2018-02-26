'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
 
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = BootstrapEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    _reactBootstrap.FormGroup,
    {
      controlId: name,
      className: 'input20Percent',
      inline: true
    },
    _react2.default.createElement(
      _reactBootstrap.ControlLabel,
      null,
      label
    ),
    _react2.default.createElement(
      _reactBootstrap.InputGroup,
      null,
      _react2.default.createElement(_reactBootstrap.FormControl, {
        type: 'number',
        value: value,
        placeholder: label,
        onChange: onChange
      }),
      addon ? _react2.default.createElement(
        _reactBootstrap.InputGroup.Addon,
        null,
        addon
      ) : null
    )
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
    _react2.default.createElement(BreakpointInput, { name: 'lg', value: lg, label: 'large', editConfigCallback: props.editConfigCallback }),
    _react2.default.createElement(BreakpointInput, { name: 'md', value: md, label: 'medium', editConfigCallback: props.editConfigCallback }),
    _react2.default.createElement(BreakpointInput, { name: 'sm', value: sm, label: 'small', editConfigCallback: props.editConfigCallback }),
    _react2.default.createElement(BreakpointInput, { name: 'xs', value: xs, label: 'extra small', editConfigCallback: props.editConfigCallback }),
    _react2.default.createElement(BreakpointInput, { name: 'xxs', value: xxs, label: 'extra extra small', editConfigCallback: props.editConfigCallback })
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
    _react2.default.createElement(ColInput, { name: 'lg', value: lg, label: 'large', editConfigCallback: props.editConfigCallback }),
    _react2.default.createElement(ColInput, { name: 'md', value: md, label: 'medium', editConfigCallback: props.editConfigCallback }),
    _react2.default.createElement(ColInput, { name: 'sm', value: sm, label: 'small', editConfigCallback: props.editConfigCallback }),
    _react2.default.createElement(ColInput, { name: 'xs', value: xs, label: 'extra small', editConfigCallback: props.editConfigCallback }),
    _react2.default.createElement(ColInput, { name: 'xxs', value: xxs, label: 'extra extra small', editConfigCallback: props.editConfigCallback })
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
      _reactBootstrap.Checkbox,
      { id: 'isDraggable', checked: isDraggable, onChange: props.editConfigCallback },
      'Items are draggable'
    ),
    _react2.default.createElement(
      _reactBootstrap.Checkbox,
      { id: 'isResizable', checked: isResizable, onChange: props.editConfigCallback },
      'Items are resizable'
    ),
    _react2.default.createElement(
      _reactBootstrap.Checkbox,
      { id: 'autoSize', checked: autoSize, onChange: props.editConfigCallback },
      'The container height swells and contracts to fit contents'
    ),
    _react2.default.createElement(
      _reactBootstrap.Checkbox,
      { id: 'verticalCompact', checked: verticalCompact, onChange: props.editConfigCallback },
      'The layout will compact vertically'
    ),
    _react2.default.createElement(InputNumberGtrThanZero, { value: marginX, label: 'Horizontal margin between items', editConfigCallback: props.editConfigCallback, name: "marginX", addon: 'px' }),
    _react2.default.createElement(InputNumberGtrThanZero, { value: marginY, label: 'Vertical margin between items', editConfigCallback: props.editConfigCallback, name: "marginY", addon: 'px' })
  );
}

function BootstrapEditor(props) {
  var _props$reactGridLayou = props.reactGridLayout,
      breakpoints = _props$reactGridLayou.breakpoints,
      cols = _props$reactGridLayou.cols;

  return _react2.default.createElement(
    'form',
    { className: 'reactDashboardBuilderBody' },
    _react2.default.createElement(
      _reactBootstrap.Grid,
      { fluid: true },
      _react2.default.createElement(
        _reactBootstrap.Row,
        null,
        _react2.default.createElement(
          _reactBootstrap.Col,
          null,
          _react2.default.createElement(Breakpoints, { breakpoints: breakpoints, editConfigCallback: props.editConfigCallback })
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Row,
        null,
        _react2.default.createElement(
          _reactBootstrap.Col,
          null,
          _react2.default.createElement(Cols, { cols: cols, editConfigCallback: props.editConfigCallback })
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Row,
        null,
        _react2.default.createElement(
          _reactBootstrap.Col,
          null,
          _react2.default.createElement(Layouts, _extends({}, props.reactGridLayout, { editConfigCallback: props.editConfigCallback }))
        )
      )
    )
  );
}