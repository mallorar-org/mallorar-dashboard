import React, { Component } from "react";
import { BiPackage } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import { IoIosStar, IoMdEye, IoMdPulse, IoMdStats } from "react-icons/io";

import { connect } from "react-redux";
import { update_product } from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_product: () => dispatch(update_product()),
  };
};

class ProductManage extends Component {
  state = {};
  handleUpdate = () => {
    let confirmation = window.confirm(
      "You're about to update this product. These updates will be delivered to this product across martlyy.com.",
    );

    if (confirmation) {
      this.props.update_product();
    }
  };
  handleDelete = () => {
    window.confirm(
      "Are you sure you want to delete this product ? You won't be able to make any sales on this product anymore.",
    );
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 pl-0">
            <div className="">
              <div className="card-body p-2 py-3">
                <h6 className="c-blue px-3 mb-2">
                  <span className="bold">Product Summary</span>
                </h6>
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
                      <td>
                        <span className="text-capitalize">
                          {this.props.product.status}
                        </span>
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <BiPackage className="mr-2" /> Stock
                        </div>
                      </td>
                      <td>InStock</td>
                    </tr> */}
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <IoIosStar className="mr-2" /> Rating
                        </div>
                      </td>
                      <td>
                        <span className="text-capitalize">
                          {this.props.product.rating}/5
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <IoMdStats className="mr-2" /> Todays Sales
                        </div>
                      </td>
                      <td>{this.props.product.todaysSales}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="">
                <div className="mb-2 text-secondary">
                  NOTE : Please revise your stock count before you apply this
                  update. Updates will be showed immediately on martlyy.com
                </div>
                <div className="mt-2 d-flex align-items-center">
                  <button
                    onClick={this.handleUpdate}
                    type="button"
                    className="ml-dash-btn btn px-5"
                  >
                    Update product
                  </button>
                  <button
                    onClick={this.handleDelete}
                    style={{
                      opacity: 0.5,
                    }}
                    className="btn btn-danger ml-2 d-flex align-items-center bold"
                  >
                    <ImBin />
                    <div>Delete Product</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
