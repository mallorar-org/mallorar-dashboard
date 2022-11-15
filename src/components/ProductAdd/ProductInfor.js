import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store/store";
import RTE from "../MallorarRichTextEditor/MallorarRichTextEditor";
import ShortDescription from "../ProductManage/ShortDescription";

import { update_product_name } from "../../store/actions/productActions";
import MLSelect from "../MLSelect/MLSelect";
import ProductVariations from "../ProductManage/ProductVariations";
import ProductDepartment from "./ProductDepartment";
import ProductImgs from "./ProductImgs";
import ProductInfomation from "./ProductInfomation";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_product_name: (name) => dispatch(update_product_name(name)),
  };
};

class ProductInfor extends Component {
  state = {};

  on_productname_change = (e) => {
    this.props.update_product_name(e.target.value);
  };

  render() {
    return (
      <>
        <div>
          <div className="card card-body">
            <h5 className="c-blue bold d-flex align-items-center pb-3">
              Product Details
            </h5>
            <div className="row mt-3">
              <div className="col-2 d-flex align-items-">
                <div>Title*</div>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  required
                  type="text"
                  value={this.props.product.product_name}
                  onChange={this.on_productname_change}
                  placeholder="..."
                  className="form-control mb-2"
                />
                <label>
                  Permalink Preview&nbsp;:&nbsp;https://mallorar.com/p/
                  {this.props.product.product_slug}
                </label>
              </div>
            </div>
            <ShortDescription />

            <div className="my-3">
              <div className="row">
                <div className="col-lg-2">
                  <span> Product type* </span>
                </div>
                <div className="col-lg-3">
                  <MLSelect
                    use_prop_value={true}
                    value={[
                      {
                        value: this.props.product.product_type,
                        label: (
                          <span
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {this.props.product.product_type.replace(/_/g, " ")}
                          </span>
                        ),
                      },
                    ]}
                    handleChange={(n) =>
                      store.dispatch({
                        type: "UPDATE_PRODUCT_TYPE",
                        payload: n.value,
                      })
                    }
                    defaultValue={[
                      { label: "General Product", value: "general_product" },
                    ]}
                    options={[
                      { label: "General Product", value: "general_product" },
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
            <div className="mt-3">
              <div className="row">
                <div className="col-lg-2">
                  <span> Product condition* </span>
                </div>
                <div className="col-lg-3">
                  <MLSelect
                    use_prop_value={true}
                    value={[
                      {
                        value: this.props.product.product_condition,
                        label: (
                          <span
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {this.props.product.product_condition.replace(
                              /_/g,
                              " ",
                            )}
                          </span>
                        ),
                      },
                    ]}
                    handleChange={(n) =>
                      store.dispatch({
                        type: "UPDATE_PRODUCT_CONDITION",
                        payload: n.value,
                      })
                    }
                    defaultValue={[{ label: "New", value: "new" }]}
                    options={[
                      { label: "New", value: "new" },
                      {
                        label: "Used",
                        value: "used",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-2">
              <div className="row">
                <div className="col-lg-2">
                  <span>Returnable product* </span>
                </div>
                <div className="col-lg-3">
                  <MLSelect
                    use_prop_value={true}
                    value={[
                      {
                        value: this.props.product.returnable,
                        label: (
                          <span
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {this.props.product.returnable.toString()}
                          </span>
                        ),
                      },
                    ]}
                    handleChange={(n) =>
                      store.dispatch({
                        type: "UPDATE_PRODUCT_RETURNABLE",
                        payload: n.value,
                      })
                    }
                    defaultValue={[{ label: "True", value: true }]}
                    options={[
                      { label: "True", value: "true" },
                      {
                        label: "False",
                        value: false,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <ProductVariations />
            <ProductDepartment />
            <ProductImgs />
            <ProductInfomation />
            <div className="container-fluid mt-4 pt-4 px-0 border-top">
              <div className="row">
                <div className="col-2">
                  <span className="">Description*</span>
                </div>
                <div className="col-10">
                  <div className="border rounded">
                    <RTE
                      initial={
                        this.props.product.product_long_description
                          ? this.props.product.product_long_description
                          : ""
                      }
                      //_987________
                      ohtml={(n) =>
                        store.dispatch({
                          type: "PRODUCT_DESCRIPTION",
                          payload: `${n}`,
                        })
                      }
                      type={"description"}
                      placeholder="Detailed Description.."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfor);
