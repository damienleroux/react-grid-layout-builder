import React from 'react';
import {Responsive} from 'react-grid-layout';
import ReactGridLayoutBuilder, {connectReactGridLayoutBuilder, withOpeningDock} from '../../src';
import { Grid, Row, Col, FormGroup, FormControl, Checkbox, ControlLabel, HelpBlock, InputGroup } from 'react-bootstrap';

var WidthProvider = require('react-grid-layout').WidthProvider;
var ResponsiveReactGridLayout = connectReactGridLayoutBuilder(WidthProvider(Responsive));
var DockedReactGridLayoutBuilder = withOpeningDock(ReactGridLayoutBuilder);

function generateLayout() {
  return _.map(_.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: _.random(0, 5) * 2 % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

const defaultReactGridLayoutProps = {
  layouts: {
    lg: generateLayout()
  },
  rowHeight: 30,
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
}

export default class ReactGridLayoutBuilderDemo extends React.Component {
  generateDOM = () => {
    return _.map(this.props.conf.layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? 'static' : ''}>
          {l.static ?
            <span className="text" title="This item is static and cannot be removed or resized.">Static - {i}</span>
            : <span className="text">{i}</span>
          }
        </div>);
    });
  }

  render() {
    return (
      <div>
        <DockedReactGridLayoutBuilder reactGridLayout={this.props.conf} updateConfigFunc={this.props.updateConfig}/>
        <ResponsiveReactGridLayout  {...this.props.conf} updateConfigFunc={this.props.updateConfig}>
          {this.generateDOM() }
        </ResponsiveReactGridLayout >
      </div>
    );
  }
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = defaultReactGridLayoutProps;
  }
  updateConfig = (config) => {
    this.setState(config);
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={9} lg={10}>
            <ReactGridLayoutBuilderDemo conf={this.state} updateConfig={this.updateConfig}/>
          </Col>
           <Col xs={12} md={3} lg={2}>
            <h1>React Grid Layout Builder</h1>
            <h3>A user interface to build react-grid-layout</h3>
            <a href="https://github.com/damienleroux/react-grid-layout-builder" title="View on github" target="blank">
              <i className="fa fa-github" aria-hidden="true"></i> View on github
            </a>
            <h4>powered by <a href="https://github.com/STRML/react-grid-layout" target="blank"> @react-grid-layout</a></h4>
            <h4>powered by <a href="https://react-bootstrap.github.io/" target="blank"> @react-bootstrap</a></h4>
            <h5>Generated Layout:</h5>
            <pre>
              <code>
                {JSON.stringify(this.state, null, 2) }
              </code>
            </pre>
          </Col>
        </Row>
      </Grid>
    );
  }
}