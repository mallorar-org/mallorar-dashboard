import React, { Component } from "react";
import { MDBTabPane, MDBTabContent } from "mdbreact";
import Atrribute from "./AtrributeEdit";
import productlist from "../productList/productlist";
import axios from "axios";

class ProductData extends Component {
  state = {
    activeItem: "1",
    variables: [],
    oldvariables: [],
  };

  deleteVarr = (e) => {
    document.getElementById(e.target.name).disabled = true;
    console.log(e.target.name);
    axios
      .get(`/dash/product/delete/variable/${e.target.name}`)
      .then(() => {
        this.props.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.props.onRef2(this);
    this.setState({
      oldvariables: this.props.data.variables,
    });
  }
  componentWillUnmount() {
    this.props.onRef2(undefined);
  }

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
    let name = e.target.name;
    let currentV = this.state.variables;
    let newArr = [];

    currentV.forEach((x) => {
      if (!(name === x.varibleName)) {
        // console.log("match",name,x.varibleName)
        newArr.push(x);
      }
    });

    this.setState({
      variables: newArr,
    });
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
    this.setState({
      variables: newVarr,
    });
    // console.log(newVarr)
  };
  render() {
    return (
      <div className="card c-blue-- ml-card-shadow mt-3 mr-2">
        <div className="card-header bg-white">
          <h5 className="c-blue border-botto mb-0">
            <span className=" bold c-blue">Product Data</span>
          </h5>
        </div>
        <div className="ml-dash-tab-item">
          <div className="ml-dash-tab-header-APP nav-tabs  bg-blueish d-flex">
            <div
              to="#"
              onClick={this.toggle("1")}
              role="tab"
              className={this.pricingTabsCss("1")}
            >
              General
            </div>

            <div
              to="#"
              onClick={this.toggle("2")}
              role="tab"
              className={this.pricingTabsCss("2")}
            >
              Shipping
            </div>
            <div
              to="#"
              onClick={this.toggle("3")}
              role="tab"
              className={this.pricingTabsCss("3")}
            >
              Attributes
            </div>
          </div>
          <MDBTabContent activeItem={this.state.activeItem}>
            <MDBTabPane tabId="1" role="tabpanel">
              <div className="card-body px-0">
                <div className="container-fluid">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-lg-3">
                        <span>Currency </span>
                      </div>
                      <div className="col-lg-3">
                        <select
                          className="form-control"
                          onChange={this.onChangeFM}
                          id="sellingCurrency"
                          placeholder="e.g $"
                        >
                          <option value="$">US$ (US Dollar)</option>
                          {/* <option value="ZAR">ZAR (South African Rand)</option> */}
                        </select>
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
                          id="productPrice"
                          min="0"
                          defaultValue={this.props.data.productPrice}
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
                          className="form-control"
                          id="salePrice"
                          onChange={this.onChangeFM}
                          defaultValue={this.props.data.oldPrice}
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
                        <select
                          defaultValue={this.props.data.productType}
                          className="form-control"
                          onChange={this.onChangeFM}
                          id="productType"
                        >
                          <option value="new-product">New product</option>
                          <option value="refubished-product">
                            Refubished product
                          </option>
                          <option value="preowned-product">
                            Preowned product
                          </option>
                          <option disabled className="download">
                            Downloadable product
                          </option>
                          <option disabled className="virtual">
                            Virtual product
                          </option>
                          <option disabled className="bulk">
                            Bulk products
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <span></span>
              </div>
            </MDBTabPane>
            <MDBTabPane tabId="2" role="tabpanel">
              <div className="card-body p-0 mt-3">
                <div className="container-fluid">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-lg-3">
                        <span> Shipping : </span>
                      </div>
                      <div className="col-lg-9">
                        <select
                          className="form-control w-25"
                          onChange={this.onChangeFM}
                          defaultValue={this.props.data.shippingType}
                          id="shippingType"
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
                  {/* <div className="mb-3">
                    <div className="row">
                      <div className="col-lg-3">
                        <span> Shipping Price : </span>
                      </div>
                      <div className="col-lg-9">
                        <input
                          className="form-control w-25"
                          onChange={this.onChangeFM}
                          id="shippingCost"
                          type="text"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-lg-3">
                        <span> Stock Warehouse : </span>
                      </div>
                      <div className="col-lg-9">
                        <input
                          className="form-control w-25"
                          onChange={this.onChangeFM}
                          defaultValue={this.props.data.stockfrom}
                          id="stockfrom"
                          type="text"
                          placeholder="JHB"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-lg-3">
                        <span> Ships/Delivered In : </span>
                      </div>
                      <div className="col-lg-9">
                        <input
                          className="form-control w-25"
                          onChange={this.onChangeFM}
                          defaultValue={this.props.data.esShippingDates}
                          id="esShippingDates"
                          type="text"
                          placeholder="7-10 Days"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MDBTabPane>
            <MDBTabPane tabId="3" role="tabpanel">
              <div className="card-body">
                <div className="mb-2">
                  Add product attributes/types available for this product
                </div>
                <div className="">
                  {this.props.data.variables === "N/A"
                    ? ""
                    : this.props.data.variables.map((x, index) => {
                        return (
                          <div
                            key={index}
                            className="my-2 d-flex card card-body"
                          >
                            <div>
                              <div>
                                <input
                                  name={x.id}
                                  id={x.id}
                                  className="float-right btn-sm btn-danger btn ml-remove-varr"
                                  value="X"
                                  onClick={this.deleteVarr}
                                  type="button"
                                />
                              </div>
                              <span className="ml-varibleName-lst-name">
                                {x.variableName}
                              </span>
                              {x.variableValue.map((x, index) => (
                                <span
                                  key={index}
                                  className="ml-varibleName-lst"
                                >
                                  {x}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  {this.state.variables.map((x, index) => {
                    return (
                      <div key={index} className="my-2 d-flex card card-body">
                        <div>
                          <div>
                            <input
                              name={x.varibleName}
                              className="float-right btn-sm btn-danger btn ml-remove-varr"
                              value="X"
                              onClick={this.removeVar}
                              type="button"
                            />
                          </div>
                          <span className="ml-varibleName-lst-name">
                            {x.varibleName}
                          </span>
                          {x.variables.map((x, index) => (
                            <span key={index} className="ml-varibleName-lst">
                              {x}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <Atrribute addvarr={this.addvarr} />
                </div>
              </div>
            </MDBTabPane>
          </MDBTabContent>
        </div>
      </div>
    );
  }
}

export default ProductData;
