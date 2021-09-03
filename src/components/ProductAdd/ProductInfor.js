import React, { Component } from "react";
import RTE from "../MallorarRichTextEditor/MallorarRichTextEditor";
import { connect } from "react-redux";
import store from "../../store/store";
import { AiOutlineTags } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import ShortDescription from "../ProductManage/ShortDescription";

import { update_product_name } from "../../store/actions/productActions";
import ProductDepartment from "./ProductDepartment";

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

  slugPreview = (e) => {
    let value = e.replace(/ /g, "-").toLowerCase();
    return <span>{`https://mallorar.com/p/MP000/${value}`}</span>;
  };

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
                  {" "}
                  Permalink Preview:{" "}
                  {this.slugPreview(this.props.product.product_name)}
                </label>
              </div>
            </div>
            <ShortDescription />
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
            <ProductDepartment />
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfor);
