import React, { Component } from "react";
import RTE from "../MallorarRichTextEditor/MallorarRichTextEditor";
import { connect } from "react-redux";
import store from "../../store/store";
import { AiOutlineTags } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import ShortDescription from "../ProductManage/ShortDescription";

import { update_product_name } from "../../store/actions/productActions";

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
          <div className="card card-body px-0  card-block">
            <h5 className="c-blue d-flex align-items-center border-bottom pb-3">
              <AiOutlineTags className="ml-icon-size2" />
              <span className="bold c-blue">&nbsp;Product Name</span>
            </h5>
            <div className="">
              <div className="mt-3 px-0 col-lg-7 col-12">
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
          </div>

          <ShortDescription />

          <div className="card ml-card-shadow card-body mt-3 mr-2">
            <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
              <BiDetail className="ml-icon-size2 mr-2" />
              <span className="bold c-blue">Description</span>
            </h5>
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
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfor);
