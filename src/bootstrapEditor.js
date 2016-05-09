import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Checkbox, ControlLabel, HelpBlock, InputGroup } from 'react-bootstrap';

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
    <FormGroup
      controlId={name}
      className="inputNumber"
      validationState={getValidationState(value) }
      >
      <ControlLabel>{label}</ControlLabel>
      <InputGroup>
        <FormControl
          type="number"
          value={value}
          placeholder={label}
          onChange={onChange}
          />
        {addon ? <InputGroup.Addon>{addon}</InputGroup.Addon> : null}
      </InputGroup>
    </FormGroup>
  );
}

function InputNumberGtrThanZero(props) {
  return <InputNumber {...props} min={1}/>;
}

function InputNumberGtrOrEqualToZero(props) {
  return <InputNumber {...props} min={0}/>;
}

function BreakpointInput(props) {
  var { name } = props;
  return <InputNumberGtrOrEqualToZero {...props} name={"breakpoints_" + name} addon="px"/>
}

function Breakpoints(props) {
  if (!props.breakpoints) {
    return <div/>;
  }
  var { lg, md, sm, xs, xxs } = props.breakpoints;
  return (
    <div >
      <h4>Breakpoints</h4>
      <BreakpointInput name= "lg" value={lg} label="large" editConfigCallback={props.editConfigCallback}/>
      <BreakpointInput name= "md" value={md} label="medium" editConfigCallback={props.editConfigCallback}/>
      <BreakpointInput name= "sm" value={sm} label="small" editConfigCallback={props.editConfigCallback}/>
      <BreakpointInput name= "xs" value={xs} label="extra small" editConfigCallback={props.editConfigCallback}/>
      <BreakpointInput name= "xxs" value={xxs} label="extra extra small" editConfigCallback={props.editConfigCallback}/>
    </div>
  );
}

function ColInput(props) {
  var { name } = props;
  return <InputNumberGtrThanZero {...props} name={"cols_" + name} addon="cols"/>
}

function Cols(props) {
  if (!props.cols) {
    return <div/>;
  }
  var { lg, md, sm, xs, xxs } = props.cols;
  return (
    <div >
      <h4>Columns</h4>
      <ColInput name= "lg" value={lg} label="large" editConfigCallback={props.editConfigCallback}/>
      <ColInput name= "md" value={md} label="medium" editConfigCallback={props.editConfigCallback}/>
      <ColInput name= "sm" value={sm} label="small" editConfigCallback={props.editConfigCallback}/>
      <ColInput name= "xs" value={xs} label="extra small" editConfigCallback={props.editConfigCallback}/>
      <ColInput name= "xxs" value={xxs} label="extra extra small" editConfigCallback={props.editConfigCallback}/>
    </div>
  );
}

function Layouts(props) {
  var {staticLayout, rowHeight} = props;
  if (!props.layouts) {
    return <div/>;
  }
  return (
    <div >
      <h4>Layouts</h4>
      <Checkbox id="staticLayout" checked={staticLayout} onClick={props.editConfigCallback }>
        All layout static
      </Checkbox>
      <InputNumberGtrThanZero value={rowHeight} label="Row Height" editConfigCallback={props.editConfigCallback} name={"rowHeight" } addon="px"/>
    </div>
  );
}

export default function BootstrapEditor(props) {
  var {rowHeight, breakpoints, cols, layouts, staticLayout} = props.reactGridLayout;
  return (
    <form className="reactDashboardBuilderBody">
      <Grid fluid>
        <Row>
          <Col>
            <Breakpoints breakpoints={breakpoints} editConfigCallback={props.editConfigCallback}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Cols cols={cols} editConfigCallback={props.editConfigCallback}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Layouts layouts={layouts} rowHeight={rowHeight} staticLayout={staticLayout} editConfigCallback={props.editConfigCallback}/>
          </Col>
          </Row>
      </Grid>
    </form>
  );
}