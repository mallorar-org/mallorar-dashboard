import React, { Component } from "react";

class STlistitem extends Component {
  state = {};
  render() {
    return (
      <li>
        <div className="d-flex align-items-center px-2 justify-content-between">
          <div>
            {this.props.x.sname} : {this.props.x.svalue}
          </div>
          <div
            onClick={() => this.props.removeslItem(this.props.x)}
            className="bold h4 mb-0 cp"
          >
            &times;
          </div>
        </div>
      </li>
    );
  }
}

export default STlistitem;
