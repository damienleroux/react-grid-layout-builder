import React, { Component } from "react";
import _ from "lodash";

export const connectReactGridLayoutBuilderToEditor = Editor => class extends Component {
	editConfigCallback = (event) => {
		if (event) {
			if (event.target) {
				const reactGridLayout = _.cloneDeep(this.props.reactGridLayout);

				const id = event.target.id;
				let targetValue = event.target.value;
				switch (id) {
					case "isDraggable":
						targetValue = event.target.checked;
						reactGridLayout.isDraggable = targetValue;
						break;
					case "isResizable":
						targetValue = event.target.checked;
						reactGridLayout.isResizable = targetValue;
						break;
					case "autoSize":
						targetValue = event.target.checked;
						reactGridLayout.autoSize = targetValue;
						break;
					case "verticalCompact":
						targetValue = event.target.checked;
						reactGridLayout.verticalCompact = targetValue;
						break;

					case "breakpoints_lg":
					case "breakpoints_md":
					case "breakpoints_sm":
					case "breakpoints_xs":
					case "breakpoints_xxs":
						reactGridLayout.breakpoints[id.replace("breakpoints_", "")] = Number(targetValue);
						break;
					case "cols_lg":
					case "cols_md":
					case "cols_sm":
					case "cols_xs":
					case "cols_xxs":
						reactGridLayout.cols[id.replace("cols_", "")] = Number(targetValue);
						break;
					case "rowHeight":
						reactGridLayout.rowHeight = Number(targetValue);
						break;
					case "marginX":
						if (reactGridLayout.margin) {
							reactGridLayout.margin[0] = Number(targetValue);
						} else {
							reactGridLayout.margin = [Number(targetValue), 10];
						}
						break;
					case "marginY":
						if (reactGridLayout.margin) {
							reactGridLayout.margin[1] = Number(targetValue);
						} else {
							reactGridLayout.margin = [10, Number(targetValue)];
						}
						break;
				}
				this.props.updateConfigFunc(reactGridLayout);
			}
		}
	}
	render() {
		return <Editor editConfigCallback={this.editConfigCallback} {...this.props} />;
	}
};

export default connectReactGridLayoutBuilderToEditor;