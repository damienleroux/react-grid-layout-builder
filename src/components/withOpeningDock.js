import React, { Component } from "react";

var withOpeningDock = ComposedComponent => class extends Component {
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
    if (!this.state.builderOpen) {
      return <div className="reactDashboardBuilderOpener">
        <i className="fa fa-cog  fa-2x" aria-hidden="true" onClick={this.toggleConfigurator}></i>
      </div>;
    }
    return (
      <div>
        <ComposedComponent {...this.props} builderOpen={this.state.builderOpen}/>
        <div className="reactDashboardBuilderOpener">
          <i className="fa fa-cog fa-2x" aria-hidden="true" onClick={this.toggleConfigurator}></i>
        </div>
      </div>
    );
  }
};
export default withOpeningDock;