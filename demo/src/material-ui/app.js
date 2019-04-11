import React from "react";
import { Responsive } from "react-grid-layout";
import {
  MaterialUIReactGridLayoutBuilder,
  connectReactGridLayoutBuilder,
  withOpeningDock
} from "../../../src";

import RaisedButton from "material-ui/RaisedButton";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme();

const WidthProvider = require("react-grid-layout").WidthProvider;
const ResponsiveReactGridLayout = connectReactGridLayoutBuilder(
  WidthProvider(Responsive)
);
const DockedReactGridLayoutBuilder = withOpeningDock(
  MaterialUIReactGridLayoutBuilder
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
    const isAllStatic = this.props.conf.isAllStatic;
    const toggleStatic = this.props.toggleStatic;
    return _.map(this.props.conf.layouts.lg, function(l, i) {
      const staticGrid = isAllStatic ? true : l.static;
      return (
        <div key={i} className={staticGrid ? "static" : ""}>
          <div>
            <i
              className={`float-right p-1 fa fa-thumbtack ${
                staticGrid ? "" : "fa-rotate-90"
              }`}
              aria-hidden="true"
              onClick={() => toggleStatic(l)}
            />
          </div>
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

  toggleStatic = grid => {
    const newlayouts = { ...this.state.layouts };
    const newitems = newlayouts.lg.slice();
    const index = newitems.findIndex(function(item) {
      return item.i === grid.i;
    });
    if (index === -1) return;

    newitems[index].static = !grid.static;

    this.setState({
      layouts: newlayouts
    });
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
    const btnStyle = { margin: 12 };

    return (
      <div>
        <div
          style={{
            width: "80%",
            display: "inline-block",
            verticalAlign: "top"
          }}
        >
          <ReactGridLayoutBuilderDemo
            conf={this.state}
            updateConfig={this.updateConfig}
            toggleStatic={this.toggleStatic}
          />
        </div>
        <div
          style={{
            width: "20%",
            display: "inline-block",
            verticalAlign: "top",
            padding: "20px"
          }}
        >
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
            <a href="https://github.com/STRML/react-grid-layout" target="blank">
              @react-grid-layout
            </a>
          </h4>
          <h4>
            powered by
            <a href="https://github.com/mui-org/material-ui/" target="blank">
              @material-ui
            </a>
          </h4>

          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <div>
                <RaisedButton
                  style={btnStyle}
                  containerElement="label"
                  label="Choose file"
                >
                  <input
                    style={{ display: "none" }}
                    onChange={e => this.handleFile(e.target)}
                    accept=".json"
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                  />
                </RaisedButton>
              </div>
              <div>
                <RaisedButton
                  label="Download layout"
                  primary={true}
                  style={btnStyle}
                  href="#"
                  href={`data:application/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(this.state.layouts)
                  )}`}
                  download={`layout ${new Date().toISOString()}.json`}
                />
              </div>
            </div>
          </MuiThemeProvider>

          <h5>Generated Layout:</h5>
          <pre>
            <code>{JSON.stringify(this.state, null, 2)}</code>
          </pre>
        </div>
      </div>
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
