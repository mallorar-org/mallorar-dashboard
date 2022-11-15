import React, { Component } from "react";
import { connect } from "react-redux";
import {
  remove_shipping_zone,
  update_int_zone_shipping_cost,
  update_int_zone_shipping_duration,
} from "../../store/actions/productActions";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove_shipping_zone: (index) => dispatch(remove_shipping_zone(index)),
    update_int_zone_shipping_cost: (cost, zindex) =>
      dispatch(update_int_zone_shipping_cost(cost, zindex)),
    update_int_zone_shipping_duration: (dur, zindex) =>
      dispatch(update_int_zone_shipping_duration(dur, zindex)),
  };
};

class ProductShippingZone extends Component {
  render() {
    return (
      <tr>
        <td
          style={{
            verticalAlign: "middle",
          }}
        >
          {this.props.x.country}
        </td>
        <td>
          <select
            defaultValue={this.props.x.shipping_duration}
            className="form-control"
            onChange={(e) =>
              this.props.update_int_zone_shipping_duration(
                e.target.value,
                this.props.x.index,
              )
            }
          >
            <option value="1-3 days">1-3 days</option>
            <option value="3-5 days">3-5 days</option>
            <option value="5-7 days">5-7 days</option>
            <option value="7-14 days">7-14 days</option>
            <option value="15-30 days">15-30 days</option>
          </select>
        </td>
        {this.props.product.intl_shipping_type !== "flat" && (
          <td>
            <input
              value={this.props.x.cost}
              onChange={(e) =>
                this.props.update_int_zone_shipping_cost(
                  parseFloat(e.target.value),
                  this.props.x.index,
                )
              }
              placeholder="Cost"
              type="number"
              className="form-control"
            />
          </td>
        )}

        <td>
          <button
            onClick={() => this.props.remove_shipping_zone(this.props.x.index)}
            className="btn ml-btn"
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductShippingZone);
