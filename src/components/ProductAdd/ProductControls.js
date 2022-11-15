import dayjs from "dayjs";
import React, { Component } from "react";
import { ImBin } from "react-icons/im";
import { IoIosRemoveCircle, IoIosRocket, IoMdCalendar } from "react-icons/io";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ProductControls extends Component {
  state = {};
  render() {
    return (
      <div className="ml-shadow align-items-center d-flex justify-content-between bg-blueish p-3 mb-3 mr-2">
        <div className="d-flex align-items-center c-blue-">
          <IoMdCalendar className="h5 mb-0" />
          <span className="ml-1">
            Posted :{dayjs(this.props.product.dateCreated).format("lll")}
          </span>
        </div>
        <div className="d-flex">
          <button className="btn ml-btn mr-2 d-flex align-items-center rounded-0 bold">
            <IoIosRemoveCircle className="pr-2 h3 mb-0 bold" />
            <div> Set Out of Stock</div>
          </button>
          <button className="btn ml-btn d-flex align-items-center mr-2 rounded-0 bold">
            <IoIosRocket className="pr-2 h3 mb-0 bold" />
            <div>Feature Product</div>
          </button>
          <button className="btn btn-danger d-flex align-items-center rounded-0 bold">
            <ImBin />
            <div>Delete Product</div>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductControls);
