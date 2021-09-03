import React, { Component } from "react";
import {
  update_combination_cost,
  update_stock_count,
} from "../../store/actions/productActions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    update_combination_cost: (value, index) =>
      dispatch(update_combination_cost(value, index)),
    update_stock_count: (value, index) =>
      dispatch(update_stock_count(value, index)),
  };
};

class VariationCombRow extends Component {
  update_combination = (e) => {
    this.props.update_combination_cost(
      parseFloat(e.target.value),
      this.props.x.variation_index,
    );
  };
  update_stock_count = (e) => {
    this.props.update_stock_count(
      parseInt(e.target.value),
      this.props.x.variation_index,
    );
  };

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
            onChange={this.update_combination}
            className="form-control"
            value={this.props.x.variations_cost}
          />
        </div>
        <div className="col-3 p-2">
          <input
            type="number"
            className="form-control"
            onChange={this.update_stock_count}
            value={this.props.x.stock_count}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(VariationCombRow);
