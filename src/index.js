import React, { Component, PropTypes } from 'react';
import connectReactGridLayoutBuilderToEditor from "./components/connectReactGridLayoutBuilderToEditor";
export connectReactGridLayoutBuilderToEditor from "./components/connectReactGridLayoutBuilderToEditor";


export const ReactGridLayoutBuilder = connectReactGridLayoutBuilderToEditor(materialUIEditor);
export withOpeningDock from "./components/withOpeningDock";
export connectReactGridLayoutBuilder from "./components/connectReactGridLayoutBuilder";
/**
 * Material UI
 */
import materialUIEditor from "./editors/material-ui";
export materialUIEditor from "./editors/material-ui";
export const MaterialUIReactGridLayoutBuilder = connectReactGridLayoutBuilderToEditor(materialUIEditor);


/**
 * Bootstrap
 */
import bootstrapEditor from "./editors/bootstrap";
export bootstrapEditor from "./editors/bootstrap";
export const BootstrapReactGridLayoutBuilder = connectReactGridLayoutBuilderToEditor(bootstrapEditor);
