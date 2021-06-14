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

const mapStateToProps = (state) => {
  return {
    product: state.product,
    productAR: state.productAR,
  };
};

class ProductData extends Component {
  state = {
    activeItem: "3",
    variables: [],
    productType: "new-product",
    sellingCurrency: "US$",
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
      50
    );
  };

  onChangeFM = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    setTimeout(
      () => store.dispatch({ type: "PRODUCT_DATA", payload: this.state }),
      50
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
    let currentV = this.props.productAR.variations[e];
    let newArr = [];

    this.props.productAR.variations.forEach((x) => {
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
    // console.log(this.state);
    return (
      <section className="pr-2" autocomplete="off">
        <ProductVariations />
        <div className="ml-card-shadow mt-4">
          <div className="card-body">
            <div className="mb-3 h5 pb-2 bold ">
              <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
                <img alt="" className="ml-icon-size1 mr-2" src={setup} />
                <span className="bold c-blue">Product Variations</span>
              </h5>
            </div>
            <div className="mb-2">
              Add product variation for this product so that people can choose
              the specific variation if thers any
            </div>

            <div>
              <Atrribute addvarr={this.addvarr} />
            </div>
            <div className="">
              {this.props.productAR.variations.map((x, index) => {
                return (
                  <AtrributeManage
                    removeVar={(n) => this.removeVar(n)}
                    number={index}
                    key={index}
                    x={x}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="ml-card-shadow mt-4">
          <div className="card-body  px-0">
            <div>
              <div className="bold h5 mx-3 mb-3 pt-0 pb-3">
                <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
                  <img alt="" className="ml-icon-size1 mr-2" src={money} />
                  <span className="bold c-blue">Pricing</span>
                </h5>
              </div>
            </div>
            <div className="container-fluid">
              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-3">
                    <span>Currency </span>
                  </div>
                  <div className="col-lg-3">
                    <MLSelect
                      handleChange={(n) =>
                        this.changeSelect("sellingCurrency", n)
                      }
                      defaultValue={[
                        { label: "US$ (US Dollar)", value: "US$" },
                      ]}
                      options={[{ label: "US$ (US Dollar)", value: "US$" }]}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-3">
                    <span>Regular Price ($)</span>
                  </div>
                  <div className="col-lg-3">
                    <input
                      className="form-control"
                      name="productPrice"
                      min="0"
                      value={
                        this.props.product.productPrice !== "default"
                          ? this.props.product.productPrice
                          : ""
                      }
                      onChange={this.onChangeFM}
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-3">
                    <span> Sale Price ($) </span>
                  </div>
                  <div className="col-lg-3">
                    <input
                      defaultValue={
                        this.props.product.oldPrice !== "default"
                          ? this.props.product.oldPrice
                          : ""
                      }
                      className="form-control"
                      name="salePrice"
                      onChange={this.onChangeFM}
                      type="number"
                      min="0"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-">
                <div className="row">
                  <div className="col-lg-3">
                    <span> Product type </span>
                  </div>
                  <div className="col-lg-3">
                    <MLSelect
                      handleChange={(n) => this.changeSelect("productType", n)}
                      defaultValue={[
                        { label: "New product", value: "new-product" },
                      ]}
                      options={[
                        { label: "New product", value: "new-product" },
                        {
                          label: "Refubished product",
                          value: "refubished-product",
                        },
                        {
                          label: "Preowned product",
                          value: "preowned-product",
                        },
                        {
                          label: "Downloadable product",
                          value: "downloadable",
                          isDisabled: true,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <span></span>
          </div>
        </div>

        <div className="ml-card-shadow mt-4">
          <div className="card-body pb-2 p-0 mt-3">
            <div className="bold h5 mx-3 mb-3 py-3">
              <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
                <img alt="" className="ml-icon-size1 mr-2" src={delivery} />
                <span className="bold c-blue">Shipping</span>
              </h5>
            </div>
            <div className="container-fluid">
              <div className="mb-3">
                <div className="row">
                  <div className="col-lg-3">
                    <span> Shipping : </span>
                  </div>
                  <div className="col-lg-9">
                    <select
                      defaultValue={this.props.product.shippingType}
                      className="form-control w-25"
                      onChange={this.onChangeFM}
                      name="shippingType"
                    >
                      <option value="calculated">Calculated</option>
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
                  <div className="col-lg-3">
                    <span> Stock Warehouse : </span>
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
                  <div className="col-lg-3">
                    <span> Apprx Delivery/Shipping duration (days) : </span>
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
