import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store/store";
import MLSelect from "../MLSelect/MLSelect";

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

  updateAvailableStock = (n) => {
    let stock_count = parseInt(n.target.value);
    store.dispatch({
      type: "UPDATE_STOCK_AVAILABLE",
      payload: stock_count,
    });

    if (stock_count === 0) {
      document.getElementById("stock-state").value = "out-of-stock";
    } else {
      document.getElementById("stock-state").value = "in-stock";
    }
  };

  setStockState = (n) => {
    let stock_state = n.target.value;

    if (stock_state === "in-stock") {
      return store.dispatch({
        type: "UPDATE_STOCK_AVAILABLE",
        payload: 1,
      });
    } else {
      let confirm_change = window.confirm(
        "You are changing stock availibility for this product. You will need to set the available stock after restocking, continue ?",
      );
      if (confirm_change) {
        return store.dispatch({
          type: "SET_OUT_OF_STOCK",
        });
      }
    }
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
                  <div className="col-lg-2 align-items-center">
                    <span className="bold">Stock* </span>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <div className="bold">Stock state</div>
                      <select
                        id="stock-state"
                        className="form-control mt-2"
                        defaultValue={
                          this.props.product.stock_count > 0
                            ? "in-stock"
                            : 'out-of-stock"'
                        }
                        onChange={this.setStockState}
                        type="number"
                        placeholder="Available stock"
                      >
                        <option value="out-of-stock">Out of stock</option>
                        <option value="in-stock">In stock</option>
                      </select>
                    </div>

                    <div>
                      <div className="">Available stock</div>
                      <input
                        disabled={this.props.product.product_variations.some(
                          (object) => object.stock_count > 0,
                        )}
                        className="form-control mt-2"
                        value={this.props.product.stock_count}
                        onChange={this.updateAvailableStock}
                        type="number"
                        placeholder="Available stock"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-top pt-3" />
              <div className="mb-3 ">
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
                      options={[{ label: "USD (US Dollar)", value: "USD" }]}
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
      </section>
    );
  }
}

export default connect(mapStateToProps, null)(ProductData);
