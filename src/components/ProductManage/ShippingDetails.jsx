import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ShippingDetails extends Component {
  render() {
    return (
      <div>
        <div className="bg-white mt-4">
          <div className="card-body pb-2 p-0 mt-3">
            <div className="bold h5 mx-3 pt-3">
              <h5 className="c-blue d-flex align-items-center  pb-3">
                <span className="bold c-blue">Shipping Details</span>
              </h5>
            </div>

            <div className="container-fluid">
              <div className="mb- mb-4 pb-4 border-bottom">
                <div className="row">
                  <div className="col-lg-2 d-flex align-items-center">
                    <span> Stock location* </span>
                  </div>
                  <div className="col-lg-9">
                    <input
                      defaultValue={
                        this.props.product.stockfrom !== "default"
                          ? this.props.product.stockfrom
                          : ""
                      }
                      className="form-control col-4"
                      onChange={this.onChangeFM}
                      name="stockfrom"
                      type="text"
                      placeholder="JHB"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-2">
                    <span>Local shipping* </span>
                  </div>
                  <div className="col-lg-9">
                    <select
                      defaultValue={this.props.product.shipping_type}
                      className="form-control col-4"
                      onChange={this.onChangeFM}
                      name="shippingType"
                    >
                      <option value="free">Free : No delivery costs</option>
                      <option value="flat">Flat : Same delivery costs</option>
                    </select>
                    <div className="my-3">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-4 px-0">
                            <div className="mb-2">Handling time</div>
                            <select
                              defaultValue={this.props.product.shipping_type}
                              className="form-control"
                              onChange={this.onChangeFM}
                              name="shippingType"
                            >
                              <option value="1 business day">
                                Same business day
                              </option>
                              <option value="1 business day">
                                1 business day
                              </option>
                              <option value="2 business days">
                                2 business days
                              </option>
                              <option value="3 business days">
                                3 business days
                              </option>
                              <option value="4 business days">
                                4 business days
                              </option>
                              <option value="5 business days">
                                5 business days
                              </option>
                              <option value="5-10 business days">
                                5-10 business days
                              </option>
                              <option value="10-15 business days">
                                10-15 business days
                              </option>
                              <option value="25-30 business days">
                                25-30 business days
                              </option>
                            </select>
                          </div>
                          <div className="col-4">
                            <div className="my-0">
                              <div className="mb-2">
                                Cost ({this.props.product.base_currency})
                              </div>
                              <input
                                disabled={
                                  this.props.product.shipping_type === "free"
                                    ? true
                                    : false
                                }
                                className="form-control"
                                onChange={this.onChangeFM}
                                name="shippingType"
                                type="number"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="my-3">
                      <div className="mb-3 mt-4">
                        Estimated Shipping Duration
                      </div>
                      <input
                        defaultValue={
                          this.props.product.esShippingDates !== "default"
                            ? this.props.product.esShippingDates
                            : ""
                        }
                        className="form-control col-4"
                        onChange={this.onChangeFM}
                        name="esShippingDates"
                        type="number"
                        max="45"
                        placeholder="3-5 Days"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 pt-4 border-top">
                <div className="row">
                  <div className="col-lg-2">
                    <span>International shipping* </span>
                  </div>
                  <div className="col-lg-9">
                    <select
                      defaultValue={this.props.product.shipping_type}
                      className="form-control col-4"
                      onChange={this.onChangeFM}
                      name="shippingType"
                    >
                      <option value="flat">
                        Flat : Same delivery costs for all
                      </option>
                      <option value="calculated">
                        Calculated : Cost differs with country
                      </option>
                      <option value="no-shipping">
                        No international shipping
                      </option>
                    </select>
                    <div className="my-3">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-4 px-0">
                            <div className="mb-2">Handling time</div>
                            <select
                              defaultValue={this.props.product.shipping_type}
                              className="form-control"
                              onChange={this.onChangeFM}
                              name="shippingType"
                            >
                              <option value="1 business day">
                                Same business day
                              </option>
                              <option value="1 business day">
                                1 business day
                              </option>
                              <option value="2 business days">
                                2 business days
                              </option>
                              <option value="3 business days">
                                3 business days
                              </option>
                              <option value="4 business days">
                                4 business days
                              </option>
                              <option value="5 business days">
                                5 business days
                              </option>
                              <option value="5-10 business days">
                                5-10 business days
                              </option>
                              <option value="10-15 business days">
                                10-15 business days
                              </option>
                              <option value="25-30 business days">
                                25-30 business days
                              </option>
                            </select>
                          </div>
                          <div className="col-4">
                            <div className="my-0">
                              <div className="mb-2">
                                Cost ({this.props.product.base_currency})
                              </div>
                              <input
                                disabled={
                                  this.props.product.shipping_type === "free"
                                    ? true
                                    : false
                                }
                                className="form-control"
                                onChange={this.onChangeFM}
                                name="shippingType"
                                type="number"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-3">
                      <button className="btn ml-btn mb-3">Add country</button>
                      <div className="">
                        <table className="table-bordered table-striped table">
                          <tr className="bg-light">
                            <td>Country</td>
                            <td>Delivery duration</td>
                            <td>Cost ({this.props.product.base_currency})</td>
                            <td>Action</td>
                          </tr>
                          <tr>
                            <td>es</td>
                            <td>es</td>
                            <td>es</td>
                            <td>es</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ShippingDetails);
