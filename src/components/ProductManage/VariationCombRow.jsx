import React, { Component } from "react";

export default class VariationCombRow extends Component {
  render() {
    return (
      <div className="row border-bottom border-left border-right">
        {/* {this.props.variation_names.forEach((x) => {
          this.props.x.variation_values.map((x1) => {
            if (x === x1.variation_name) {
              console.log(x1.value_value);
              return (
                <div className="col-2 d-flex align-items-center p-2 border-right">
                  {x1.value_value}
                </div>
              );
            }
          });
        })} */}

        {this.props.x.variation_values.map((x) => (
          <div className="col-2 d-flex align-items-center p-2 border-right">
            {x.value_value}
          </div>
        ))}
        <div className="col-3 border-right p-2">
          <input
            type="number"
            className="form-control"
            defaultValue={this.props.x.variations_cost}
          />
        </div>
        <div className="col-3 p-2">
          <input
            type="number"
            className="form-control"
            defaultValue={this.props.x.stock_count}
          />
        </div>
      </div>
    );
  }
}
