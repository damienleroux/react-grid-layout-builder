import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';


const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

function InputNumber(props) {
  var { name, label, value, min, max, editConfigCallback, addon } = props;
  value = value ? value : 0;

  var getValidationState = (value) => {
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
  }

  var onChange = (event) => {
    if (getValidationState(event.target.value) === 'success') {
      editConfigCallback(event);
    }
  }

  return (
    <div className="col">
      <TextField
        style={{ width: "80%" }}
        id={name}
        name={name}
        value={value}
        hintText={label}
        floatingLabelText={label}
        type="number"
        onChange={onChange}
      />

      {addon ? <span>{addon}</span> : null}
    </div>
  );
}




function InputNumberGtrThanZero(props) {
  return <InputNumber {...props} min={1} />;
}

function InputNumberGtrOrEqualToZero(props) {
  return <InputNumber {...props} min={0} />;
}

function BreakpointInput(props) {
  var { name } = props;
  return <InputNumberGtrOrEqualToZero {...props} name={"breakpoints_" + name} addon="px" />
}

function Breakpoints(props) {
  if (!props.breakpoints) {
    return (<div></div>);
  }
  var { lg, md, sm, xs, xxs } = props.breakpoints;
  return (
    <div>
      <h4>Breakpoints</h4>
      <div className="row">
        <BreakpointInput name="lg" value={lg} label="large" editConfigCallback={props.editConfigCallback} />
        <BreakpointInput name="md" value={md} label="medium" editConfigCallback={props.editConfigCallback} />
        <BreakpointInput name="sm" value={sm} label="small" editConfigCallback={props.editConfigCallback} />
        <BreakpointInput name="xs" value={xs} label="extra small" editConfigCallback={props.editConfigCallback} />
        <BreakpointInput name="xxs" value={xxs} label="extra extra small" editConfigCallback={props.editConfigCallback} />
      </div>
    </div>
  );
}

function ColInput(props) {
  var { name } = props;
  return <InputNumberGtrThanZero {...props} name={"cols_" + name} addon="cols" />
}

function Cols(props) {
  if (!props.cols) {
    return <div />;
  }
  var { lg, md, sm, xs, xxs } = props.cols;
  return (
    <div >
      <h4>Columns</h4>
      <div className="row">
        <ColInput name="lg" value={lg} label="large" editConfigCallback={props.editConfigCallback} />
        <ColInput name="md" value={md} label="medium" editConfigCallback={props.editConfigCallback} />
        <ColInput name="sm" value={sm} label="small" editConfigCallback={props.editConfigCallback} />
        <ColInput name="xs" value={xs} label="extra small" editConfigCallback={props.editConfigCallback} />
        <ColInput name="xxs" value={xxs} label="extra extra small" editConfigCallback={props.editConfigCallback} />
      </div>
    </div>
  );
}

function Layouts(props) {
  if (!props.layouts) {
    return <div />;
  }

  var { rowHeight, isDraggable, isResizable, autoSize, verticalCompact, margin } = props;

  //Set with defaultValue if no defined
  rowHeight = rowHeight !== undefined ? rowHeight : 150;
  isDraggable = isDraggable !== undefined ? isDraggable : true;
  isResizable = isResizable !== undefined ? isResizable : true;
  autoSize = autoSize !== undefined ? autoSize : true;
  verticalCompact = verticalCompact !== undefined ? verticalCompact : true;
  var marginX = margin && margin[0] !== undefined ? margin[0] : 10;
  var marginY = margin && margin[1] !== undefined ? margin[1] : 10;

  return (
    <div >
      <h4>Layouts</h4>
      <InputNumberGtrThanZero value={rowHeight} label="Row Height" editConfigCallback={props.editConfigCallback} name={"rowHeight"} addon="px" />
      <MuiThemeProvider>
        <div>
          <Checkbox
            id="isDraggable"
            name="isDraggable"
            checked={isDraggable}
            onCheck={props.editConfigCallback}
            label="Items are draggable"
            style={styles.checkbox}
          />

          <Checkbox
            id="isResizable"
            name="isResizable"
            checked={isResizable}
            onCheck={props.editConfigCallback}
            label="Items are resizable"
            style={styles.checkbox}
          />

          <Checkbox
            id="autoSize"
            name="autoSize"
            checked={autoSize}
            onCheck={props.editConfigCallback}
            label="The container height swells and contracts to fit contents"
            style={styles.checkbox}
          />

          <Checkbox
            id="verticalCompact"
            name="verticalCompact"
            checked={verticalCompact}
            onCheck={props.editConfigCallback}
            label="The layout will compact vertically"
            style={styles.checkbox}
          />



        </div>
      </MuiThemeProvider>

      <div className="row">
        <InputNumberGtrThanZero value={marginX} label="Horizontal margin between items" editConfigCallback={props.editConfigCallback} name={"marginX"} addon="px" />
        <InputNumberGtrThanZero value={marginY} label="Vertical margin between items" editConfigCallback={props.editConfigCallback} name={"marginY"} addon="px" />
      </div>
    </div>
  );
}

export default function BootstrapEditor(props) {
  var { breakpoints, cols } = props.reactGridLayout;
  return (
    <form className="reactDashboardBuilderBody" style={{ background: "unset" }}>
      <MuiThemeProvider>
        <div className="container-fluid">

          <Breakpoints breakpoints={breakpoints} editConfigCallback={props.editConfigCallback} />

          <Cols cols={cols} editConfigCallback={props.editConfigCallback} />

          <Layouts {...props.reactGridLayout} editConfigCallback={props.editConfigCallback} />

        </div>

      </MuiThemeProvider>
    </form>
  );
}