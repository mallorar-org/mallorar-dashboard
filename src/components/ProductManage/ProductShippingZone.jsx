import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store/store";

const mapStateToProps = (state) => {
  return {
    product: state.product,
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
            className="form-control"
            onChange={(e) =>
              store.dispatch({
                type: "UPDATE_LOCAL_EST_SHIPPING_DUR",
                payload: e.target.value,
              })
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
            <input placeholder="Cost" type="number" className="form-control" />
          </td>
        )}

        <td>
          <button className="btn ml-btn">Remove</button>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, null)(ProductShippingZone);
