import React, { Component } from "react";

class Variation extends Component {
  state = {};
  render() {
    return (
      <div className="row border-top text-center">
        {this.props.x.map((x, index) => (
          <div
            key={index}
            className="col-2 p-2 border-right d-flex align-items-center justify-content-center"
          >
            {x}
          </div>
        ))}

        {/* <div className="col-3 p-2 border-right">
          <input placeholder="0.00" type="number" className="form-control" />
        </div> */}
        <div className="col-3 p-2">
          <input placeholder="0" type="number" className="form-control" />
        </div>
      </div>
    );
  }
}

export default Variation;
