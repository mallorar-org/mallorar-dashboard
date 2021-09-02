import React, { Component } from "react";
import { IoMdStats, IoMdPulse, IoIosStar, IoMdEye } from "react-icons/io";
import { BiPackage } from "react-icons/bi";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ProductManage extends Component {
  state = {};
  render() {
    return (
      <div className="card c-blue p-2 card-body ml-card-shadow card-block ml-2">
        <div className="card-body p-2">
          <h5 className="c-blue text-center mb-2 ">
            <span className=" bold b- c-blue">Summary</span>
          </h5>

          <table className="table ml-d-p-m-table-stats">
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <IoMdEye className="mr-2" /> Seen
                  </div>
                </td>
                <td>
                  {this.props.product.visited
                    ? "0"
                    : this.props.product.visited}
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <IoMdPulse className="mr-2" /> Status
                  </div>
                </td>
                <td>Active</td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <BiPackage className="mr-2" /> Stock
                  </div>
                </td>
                <td>InStock</td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <IoIosStar className="mr-2" /> Rating
                  </div>
                </td>
                <td>3/5 (53009)</td>
              </tr>

              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <IoMdStats className="mr-2" /> Total Sales
                  </div>
                </td>
                <td>345</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer border-0 bg-blueish rounded">
          <button
            type="button"
            className="ml-dash-btn w-100 px-5"
            style={{ float: "right" }}
          >
            Update Product
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductManage);
