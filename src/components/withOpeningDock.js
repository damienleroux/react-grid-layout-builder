import React, { Component } from "react";

const withOpeningDock = ComposedComponent => class extends Component {
	constructor() {
		super();
		this.state = {
			builderOpen: false
		};
	}

	toggleConfigurator = () => {
		this.setState({
			builderOpen: !this.state.builderOpen
		});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.builderOpen ? <ComposedComponent {...this.props} builderOpen={this.state.builderOpen} /> : null }
				
				<div className="reactDashboardBuilderOpener">
					<i className="fa fa-cog fa-2x" aria-hidden="true" onClick={this.toggleConfigurator}></i>
				</div>
			</React.Fragment>
		);
	}
};

export default withOpeningDock;