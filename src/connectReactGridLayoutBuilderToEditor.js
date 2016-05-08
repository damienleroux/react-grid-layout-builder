import React, { Component } from "react";
import _ from "lodash";

export var connectReactGridLayoutBuilderToEditor = Editor => class extends Component {	
  editConfigCallback = (event) => {
		if (event) {
			if (event.target) {
				var reactGridLayout = _.cloneDeep(this.props.reactGridLayout);

				var id = event.target.id;
				var targetValue = event.target.value;
				switch (id) {
					case "staticLayout":
						targetValue = event.target.checked;
						var {layout, layouts} = reactGridLayout;
						if (layout) {
							_.forEach(layout, (item) => {
								item.static = targetValue;
							})
						}
						if (layouts) {
							_.forEach(layouts, (layout) => {
								_.forEach(layout, (item) => {
									item.static = targetValue;
								})
							})
						}
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
				}
				this.props.updateConfigFunc(reactGridLayout);
			}
		}
	}
render(){
    return <Editor editConfigCallback={this.editConfigCallback} {...this.props} />;
  }
};

export default connectReactGridLayoutBuilderToEditor;