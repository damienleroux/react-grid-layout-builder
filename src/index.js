import React, { Component, PropTypes } from 'react';
import materialUIEditor from "./materialUIEditor";
import connectReactGridLayoutBuilderToEditor from "./connectReactGridLayoutBuilderToEditor";


var ReactGridLayoutBuilder = connectReactGridLayoutBuilderToEditor(materialUIEditor);

export withOpeningDock from "./components/withOpeningDock";
export connectReactGridLayoutBuilder from "./connectReactGridLayoutBuilder";
export connectReactGridLayoutBuilderToEditor from "./connectReactGridLayoutBuilderToEditor";
export materialUIEditor from "./materialUIEditor";
export default ReactGridLayoutBuilder;
