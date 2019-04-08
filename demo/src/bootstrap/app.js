import React from "react";
import { Responsive } from "react-grid-layout";
import {
  BootstrapReactGridLayoutBuilder,
  connectReactGridLayoutBuilder,
  withOpeningDock
} from "../../../src";
import { Grid, Row, Col, Button } from "react-bootstrap";

const WidthProvider = require("react-grid-layout").WidthProvider;
const ResponsiveReactGridLayout = connectReactGridLayoutBuilder(
  WidthProvider(Responsive)
);
const DockedReactGridLayoutBuilder = withOpeningDock(
  BootstrapReactGridLayoutBuilder
);

function generateLayout() {
  return _.map(_.range(0, 25), function(item, i) {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
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
    lg: getFromLS("layouts", "lg") || generateLayout()
  },
  rowHeight: 30,
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
};

class ReactGridLayoutBuilderDemo extends React.Component {
  generateDOM = () => {
    const allStatic = this.props.conf.isStatic;
    return _.map(this.props.conf.layouts.lg, function(l, i) {
      const staticGrid = allStatic ? true : l.static;
      return (
        <div key={i} className={staticGrid ? "static" : ""}>
          {staticGrid ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  };

  onLayoutChange = layout => {
    saveToLS("layouts", layout, "lg");
  };

  render() {
    return (
      <div>
        <DockedReactGridLayoutBuilder
          reactGridLayout={this.props.conf}
          updateConfigFunc={this.props.updateConfig}
        />
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          {...this.props.conf}
          updateConfigFunc={this.props.updateConfig}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = defaultReactGridLayoutProps;
  }
  updateConfig = config => {
    this.setState(config);
  };

  handleFile = element => {
    // https://www.html5rocks.com/en/tutorials/file/dndfiles/
    const files = element.files;
    if (!files.length) {
      alert("Please select a file!");
      return;
    }
    const file = files[0];
    const start = 0;
    const stop = file.size - 1;

    const reader = new FileReader();
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = evt => {
      if (evt.target.readyState == FileReader.DONE) {
        // DONE == 2
        const layouts = { ...this.state.layouts };
        layouts.lg = JSON.parse(evt.target.result).lg;
        this.setState({ layouts });
      }
    };

    const blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  };

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={9} lg={10}>
            <ReactGridLayoutBuilderDemo
              conf={this.state}
              updateConfig={this.updateConfig}
            />
          </Col>
          <Col xs={12} md={3} lg={2}>
            <h1>React Grid Layout Builder</h1>
            <h3>A user interface to build react-grid-layout</h3>
            <a
              href="https://github.com/damienleroux/react-grid-layout-builder"
              title="View on github"
              target="blank"
            >
              <i className="fa fa-github" aria-hidden="true" /> View on github
            </a>
            <h4>
              powered by
              <a
                href="https://github.com/STRML/react-grid-layout"
                target="blank"
              >
                @react-grid-layout
              </a>
            </h4>
            <h4>
              powered by
              <a href="https://react-bootstrap.github.io/" target="blank">
                @react-bootstrap
              </a>
            </h4>
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  onChange={e => this.handleFile(e.target)}
                  accept=".json"
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                />
                <label
                  className="custom-file-label text-truncate"
                  htmlFor="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                >
                  Choose file
                </label>
              </div>
            </div>

            <a
              href={`data:application/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(this.state.layouts)
              )}`}
              download={`layout ${new Date().toISOString()}.json`}
              className="btn btn-primary mb-3"
            >
              Download layout
            </a>
            <h5>Generated Layout:</h5>
            <pre>
              <code>{JSON.stringify(this.state, null, 2)}</code>
            </pre>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function getFromLS(prop, key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  //return [];
  return ls[prop];
}

function saveToLS(valueKey, value, key) {
  if (global.localStorage) {
    global.localStorage.setItem(
      key,
      JSON.stringify({
        [valueKey]: value
      })
    );
  }
}
