import React, { Component } from "react";

class ROption extends Component {
  state = {};
  render() {
    return (
      <div className="mb-2 c-blue-">
      <div className="d-inline-block">
        <label onClick={(n)=>this.props.selected(this.props.region)} className="ml-input-c">
          <div>
            <input onChange={this.tick} name="1" type="checkbox" />
            <span className="checkmark r-"></span>
          </div>
          <div className="d-inline-blockn ml-5-">{this.props.region}</div>
        </label>
      </div >
      </div>
    );
  }
}

export default ROption;
