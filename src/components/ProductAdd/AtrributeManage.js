import React, { Component } from "react";

class AtrributeManage extends Component {
  state = {};

  variableMap = () => {
    if (
      this.props.x.varibleName.toLowerCase() === "color" ||
      this.props.x.varibleName.toLowerCase() === "colour"
    ) {
      return this.props.x.variables.map((x, index) => {
        if (this.isValidColor(x)) {
          return (
            <div
              key={index}
              style={{ background: x }}
              className="ml-varible-color-lst"
              title={x}
            ></div>
          );
        } else {
          return (
            <div
              key={index}
              style={{ background: x }}
              className="ml-varibleName-lst"
              title={x}
            >
              {x}
            </div>
          );
        }
      });
    }

    return this.props.x.variables.map((x, index) => (
      <div key={index} className="ml-varibleName-lst">
        {x}
      </div>
    ));
  };

  isValidColor(strColor) {
    var s = new Option().style;
    s.background = strColor;
    return s.background == strColor.toLowerCase();
  }
  render() {
    return (
      <div className="my-2 border py-2 rounded d-flex card card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className="ml-varibleName-lst-name">
              {this.props.x.varibleName}
            </span>
            {this.variableMap()}
          </div>
          <div>
            <span
              onClick={() => this.props.removeVar(this.props.number)}
              className=" bold text-dark h2 cp mb-0 ml-remove-varr"
            >
              &times;
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AtrributeManage;
