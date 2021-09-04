import React, { Component } from "react";
import { MDBTabPane, MDBTabContent } from "mdbreact";
import { connect } from "react-redux";
import Atrribute from "./Atrribute";
import store from "../../store/store";
import MLSelect from "../MLSelect/MLSelect";
import money from "../../assets/images/money.svg";
import delivery from "../../assets/images/delivery.svg";
import setup from "../../assets/images/setup.svg";
import AtrributeManage from "../ProductAdd/AtrributeManage";
import ProductVariations from "../ProductManage/ProductVariations";
import { registerLocale } from "react-datepicker";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ProductData extends Component {
  state = {
    activeItem: "3",
    variables: [],
    productType: "new-product",
    sellingCurrency: "USD",
    productPrice: "0",
    salePrice: "0",
    shippingType: "calculated",
    stockfrom: "",
    esShippingDates: "",
  };

  changeSelect = (n, v) => {
    this.setState({
      [n]: v.value,
    });

    setTimeout(
      () => store.dispatch({ type: "PRODUCT_DATA", payload: this.state }),
      50,
    );
  };

  onChangeFM = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    setTimeout(
      () => store.dispatch({ type: "PRODUCT_DATA", payload: this.state }),
      50,
    );
  };

  captureData = () => {
    let productType = document.getElementById("productType").value;
    let sellingCurrency = document.getElementById("sellingCurrency").value;
    let productPrice = document.getElementById("productPrice").value;
    let oldPrice = document.getElementById("salePrice").value;
    let shippingType = document.getElementById("shippingType").value;
    // let shippingCost = document.getElementById("shippingCost").value;
    let stockfrom = document.getElementById("stockfrom").value;
    let esShippingDates = document.getElementById("esShippingDates").value;

    if (!oldPrice) {
      oldPrice = "0";
    }

    let productData = {
      productType: productType,
      sellingCurrency: sellingCurrency,
      productPrice: productPrice,
      shippingType: shippingType,
      oldPrice: oldPrice,
      stockfrom: stockfrom,
      esShippingDates: esShippingDates,
      productVariables: this.state.variables,
    };
    // console.log("oiehs",productData)
    this.props.getProductData(productData);
  };

  removeVar = (e) => {
    let currentV = this.props.product.product_variations[e];
    let newArr = [];

    this.props.product.product_variations.forEach((x) => {
      if (currentV !== x) {
        newArr.push(x);
      }
    });

    store.dispatch({ type: "UPDATE_VARIATIONS", payload: newArr });
  };

  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  pricingTabsCss(tab) {
    let cssRacho;
    if (tab === this.state.activeItem) {
      cssRacho = "ml-dash-PPtab ml-dash-PPtab-active";
    } else {
      cssRacho = "ml-dash-PPtab";
    }

    return cssRacho;
  }

  addvarr = (v) => {
    // console.log(v);
    let currentvarr = this.state.variables;
    currentvarr.push(v);
    let newVarr = currentvarr;

    store.dispatch({ type: "UPDATE_VARIATIONS", payload: newVarr });
  };
  render() {
    console.log(this.state);
    return (
      <section className="" autoComplete="new-password">
        <div className="bg-white mt-4">
          <div className="card-body  px-0">
            <div>
              <div className="bold h5 mx-3 mb-3 pt-0">
                <h5 className="c-blue d-flex align-items-center  pb-2">
                  <span className="bold c-blue">
                    Pricing &amp; Selling Details
                  </span>
                </h5>
              </div>
            </div>
            <div className="container-fluid">
              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-2">
                    <span>Base currency* </span>
                  </div>
                  <div className="col-lg-3">
                    <MLSelect
                      use_prop_value={true}
                      value={
                        this.props.product.base_currency
                          ? [
                              {
                                value: this.props.product.base_currency,
                                label: this.props.product.base_currency,
                              },
                            ]
                          : []
                      }
                      handleChange={(n) =>
                        store.dispatch({
                          type: "UPDATE_BASE_CURRENCY",
                          payload: n.value,
                        })
                      }
                      placeholder="Select base currency"
                      options={[
                        { label: "USD (US Dollar)", value: "USD" },
                        { label: "ZAR (South African Rand)", value: "ZAR" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-2">
                    <span>
                      Regular Price* ({this.props.product.base_currency})
                    </span>
                  </div>
                  <div className="col-lg-3">
                    <input
                      className="form-control"
                      min="0"
                      value={this.props.product.product_price}
                      onChange={(e) =>
                        store.dispatch({
                          type: "UPDATE_PRODUCT_PRICE",
                          payload: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-2">
                    <span>Product on sale ? </span>
                  </div>
                  <div className="col-lg-3">
                    <MLSelect
                      use_prop_value={true}
                      value={[
                        {
                          value: this.props.product.on_sale,
                          label: this.props.product.on_sale.toString(),
                        },
                      ]}
                      handleChange={(n) =>
                        store.dispatch({
                          type: "UPDATE_PRODUCT_ON_SALE",
                          payload: n.value,
                        })
                      }
                      options={[
                        { label: "true", value: true },
                        { label: "false", value: false },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {this.props.product.on_sale && (
                <>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-lg-2">
                        <span>
                          {" "}
                          Sale Price ({this.props.product.base_currency}){" "}
                        </span>
                      </div>
                      <div className="col-lg-3">
                        <input
                          value={this.props.product.sale_price}
                          className="form-control"
                          onChange={(e) =>
                            store.dispatch({
                              type: "UPDATE_PRODUCT_SALE_PRICE",
                              payload: parseFloat(e.target.value),
                            })
                          }
                          type="number"
                          min="0"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <span></span>
          </div>
        </div>

        <div className="bg-white mt-4">
          <div className="card-body pb-2 p-0 mt-3">
            <div className="bold h5 mx-3 pt-3">
              <h5 className="c-blue d-flex align-items-center  pb-3">
                <span className="bold c-blue">Shipping Details</span>
              </h5>
            </div>
            <div className="container-fluid">
              <div className="mb-3">
                <div className="row">
                  <div className="d-flex align-items-center col-lg-2">
                    <span> Shipping* </span>
                  </div>
                  <div className="col-lg-9">
                    <select
                      defaultValue={this.props.product.shippingType}
                      className="form-control w-50"
                      onChange={this.onChangeFM}
                      name="shippingType"
                    >
                      <option value="calculated">
                        Calculated : Varies with location
                      </option>
                      <option disabled value="free">
                        Free
                      </option>
                      <option disabled value="flat">
                        Flat
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
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
                      className="form-control w-25"
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
                    <span> Apprx Delivery/Shipping duration (days)* </span>
                  </div>
                  <div className="col-lg-9">
                    <input
                      defaultValue={
                        this.props.product.esShippingDates !== "default"
                          ? this.props.product.esShippingDates
                          : ""
                      }
                      className="form-control w-25"
                      onChange={this.onChangeFM}
                      name="esShippingDates"
                      type="number"
                      max="45"
                      placeholder="10 Days"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, null)(ProductData);
