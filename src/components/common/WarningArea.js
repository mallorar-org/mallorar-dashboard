import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    core: state.core,
  };
};
const mapDispatchToProps = () => {
  return {};
};

class WarningArea extends Component {
  state = {};

  inCompleteSetUp = () => {
    return (
      <div className="alert mb-3 mb-0 py-2 alert-danger b-border-top">
        <div className="bold">Incomplete setup</div>
        <div>Incoplete setups</div>
      </div>
    );
  };

  render() {
    return (
      <div className="px-3 mt-3">
        {this.props.core ? this.inCompleteSetUp() : undefined}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarningArea);
