import React, { Component, PropTypes } from 'react';
import BootstrapEditor from "./materialUIEditor";
import connectReactGridLayoutBuilderToEditor from "./connectReactGridLayoutBuilderToEditor";


var ReactGridLayoutBuilder = connectReactGridLayoutBuilderToEditor(BootstrapEditor);

export withOpeningDock from "./components/withOpeningDock";
export connectReactGridLayoutBuilder from "./connectReactGridLayoutBuilder";
export connectReactGridLayoutBuilderToEditor from "./connectReactGridLayoutBuilderToEditor";
export BootstrapEditor from "./bootstrapEditor";
export default ReactGridLayoutBuilder;
