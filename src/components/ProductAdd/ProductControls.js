import dayjs from "dayjs";
import React, { Component } from "react";
import { IoIosRemoveCircle, IoIosRocket, IoMdCalendar } from "react-icons/io";
import { connect } from "react-redux";
import store from "../../store/store";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ProductControls extends Component {
  state = {};
  set_out_of_stock = () => {
    let confirm_change = window.confirm(
      "You are changing stock availibility for this product. You will need to set the available stock after restocking, continue ?",
    );
    if (confirm_change) {
      return store.dispatch({
        type: "SET_OUT_OF_STOCK",
      });
    }
  };
  render() {
    return (
      <div className="ml-shadow align-items-center d-flex justify-content-between bg-blueish pl-3 pr-1 py-2 mb-3 mr-2">
        <div className="d-flex align-items-center c-blue-">
          <IoMdCalendar className="h5 mb-0" />
          <span className="ml-1">
            Created: {dayjs(this.props.product.dateCreated).format("lll")}
          </span>
        </div>
        <div className="d-flex">
          <button
            onClick={this.set_out_of_stock}
            className="btn ml-btn mr-2 d-flex align-items-center rounded-0 bold"
          >
            <IoIosRemoveCircle className="pr-2 h3 mb-0 bold" />
            <div> Set Out of Stock</div>
          </button>
          <button className="btn ml-btn d-flex align-items-center mr-2 rounded-0 bold">
            <IoIosRocket className="pr-2 h3 mb-0 bold" />
            <div>Feature Product</div>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductControls);
