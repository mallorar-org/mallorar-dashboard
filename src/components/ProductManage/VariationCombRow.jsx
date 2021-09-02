import React, { Component } from "react";

export default class VariationCombRow extends Component {
  update_combination = () => {};
  render() {
    return (
      <div className="row border-bottom border-left border-right">
        {this.props.x.variation_values.map((x) => (
          <div className="col-2 d-flex align-items-center p-2 border-right">
            {x.value_value}
          </div>
        ))}
        <div className="col-3 border-right p-2">
          <input
            type="number"
            update_combination_cost={this.update_combination}
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
