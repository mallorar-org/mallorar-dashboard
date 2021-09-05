import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store/store";
import countries from "../../util/countries";
import ZoneAdder from "./ZoneAdder";
import ProductShippingZone from "./ProductShippingZone";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ShippingDetails extends Component {
  state = {
    add_sz_modal_on: false,
  };
  render() {
    return (
      <div>
        <ZoneAdder modal_on={this.state.add_sz_modal_on} />
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
                  <div className="col-lg-2">
                    <span>From location* </span>
                  </div>
                  <div className="col-lg-9">
                    <div className="mb-2">Country</div>
                    <select
                      value={this.props.product.product_in_country}
                      className="form-control col-4"
                      onChange={(e) =>
                        store.dispatch({
                          type: "UPDATE_PRODUCT_COUNTRY",
                          payload: e.target.value,
                        })
                      }
                    >
                      {countries.map((x) => (
                        <option value={x}>{x}</option>
                      ))}
                    </select>
                    <div className="mb-2 mt-3">State/City</div>
                    <input
                      value={this.props.product.product_in_city}
                      className="form-control col-4"
                      onChange={(e) =>
                        store.dispatch({
                          type: "UPDATE_PRODUCT_CITY",
                          payload: e.target.value,
                        })
                      }
                      className="form-control col-4"
                      name="stockfrom"
                      type="text"
                      placeholder="State/City"
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
                      defaultValue={this.props.product.local_shipping_type}
                      className="form-control col-4"
                      onChange={(e) =>
                        store.dispatch({
                          type: "UPDATE_LOCAL_SHIPPING_TYPE",
                          payload: e.target.value,
                        })
                      }
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
                              defaultValue={
                                this.props.product.local_handling_time
                              }
                              onChange={(e) =>
                                store.dispatch({
                                  type: "UPDATE_LOCAL_HANDLING_TIME",
                                  payload: e.target.value,
                                })
                              }
                              className="form-control"
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
                                15-30 business days
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
                                  this.props.product.local_shipping_type ===
                                  "free"
                                    ? true
                                    : false
                                }
                                value={this.props.product.local_shipping_cost}
                                onChange={(e) =>
                                  store.dispatch({
                                    type: "UPDATE_LOCAL_SHIPPING_COST",
                                    payload: parseFloat(e.target.value),
                                  })
                                }
                                className="form-control"
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
                      <select
                        defaultValue={
                          this.props.product.local_estimated_del_duration
                        }
                        className="form-control col-4"
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
                      defaultValue={this.props.product.intl_shipping_type}
                      className="form-control col-4"
                      onChange={(e) =>
                        store.dispatch({
                          type: "UPDATE_INTL_SHIPING_TYPE",
                          payload: e.target.value,
                        })
                      }
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
                    {this.props.product.intl_shipping_type !==
                      "no-shipping" && (
                      <>
                        <div className="my-3">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-4 px-0">
                                <div className="mb-2">Handling time</div>
                                <select
                                  defaultValue={
                                    this.props.product.intl_handling_time
                                  }
                                  className="form-control"
                                  onChange={(e) =>
                                    store.dispatch({
                                      type: "UPDATE_INTL_HANDLING_TIME",
                                      payload: e.target.value,
                                    })
                                  }
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
                                {this.props.product.intl_shipping_type ===
                                  "flat" && (
                                  <>
                                    <div className="my-0">
                                      <div className="mb-2">
                                        Cost ({this.props.product.base_currency}
                                        )
                                      </div>
                                      <input
                                        value={
                                          this.props.product.intl_del_flat_fee
                                        }
                                        className="form-control"
                                        onChange={(e) =>
                                          store.dispatch({
                                            type: "UPDATE_INTL_DEL_FLAT_FEE",
                                            payload: parseFloat(e.target.value),
                                          })
                                        }
                                        type="number"
                                        placeholder="0.00"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <button
                            onClick={() =>
                              this.setState({
                                add_sz_modal_on: !this.state.add_sz_modal_on,
                              })
                            }
                            className="btn ml-btn mb-3"
                          >
                            Add country
                          </button>
                          <div className="">
                            <table className="table-bordered table-striped table">
                              <tr className="bg-light">
                                <td>Country</td>
                                <td>Delivery duration</td>
                                {this.props.product.intl_shipping_type !==
                                  "flat" && (
                                  <>
                                    <td>
                                      Cost ({this.props.product.base_currency})
                                    </td>
                                  </>
                                )}

                                <td>Action</td>
                              </tr>
                              {this.props.product.intl_shipping_zones.map(
                                (x) => (
                                  <ProductShippingZone key={x.index} x={x} />
                                ),
                              )}
                            </table>
                          </div>
                        </div>
                      </>
                    )}
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
