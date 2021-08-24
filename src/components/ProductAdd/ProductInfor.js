import React, { Component } from "react";
import productlist from "../productList/productlist";
import RTE from "../MallorarRichTextEditor/MallorarRichTextEditor";
import { connect } from "react-redux";
import store from "../../store/store";
import whitetag from "../../assets/images/whitetag.svg";
import list from "../../assets/images/list.svg";
import productdescription from "../../assets/images/productdescription.svg";
import { AiOutlineTags } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { CgDetailsLess } from "react-icons/cg";
import ShortDescription from "../ProductManage/ShortDescription";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ProductInfor extends Component {
  state = {
    productSlugPreview: "",
    productSlugPreview: "",
    productSlug: "",
    productName: "",
    productSD1: "",
    productSD2: "",
    productSD3: "",
    productSD4: "",
    productSD5: "",
  };

  slugPreview = (e) => {
    let value = e.replace(/ /g, "-").toLowerCase();
    return <span>{`https://mallorar.com/p/MP000/${value}`}</span>;
  };

  onChangeFM = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });

    store.dispatch({
      type: "PRODUCT_POINTS",
      payload: { ...this.state, [e.target.id]: e.target.value },
    });
  };

  pnChange = (e) => {
    let value = e.target.value.replace(/ /g, "-").toLowerCase();
    this.setState({
      productSlugPreview: value,
      productSlug: value,
      productName: e.target.value,
    });

    store.dispatch({
      type: "PRODUCT_TITLE",
      payload: {
        productName: e.target.value,
        productSlug: e.target.value.replace(/ /g, "-").toLowerCase(),
      },
    });
  };
  render() {
    return (
      <>
        <form autocomplete="off" onSubmit={this.handleSubmit} id="formDetails">
          <div className="card card-body ml-shadow card-block mr-2">
            <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
              <AiOutlineTags className="ml-icon-size2 mr-2" />

              <span className="bold c-blue">Product Name</span>
            </h5>
            <div className="">
              <div className="mt-3">
                <input
                  required
                  type="text"
                  value={this.props.product.productName}
                  onChange={this.pnChange}
                  id="productName"
                  placeholder="..."
                  className="form-control mb-2"
                />
                <label>
                  {" "}
                  Permalink Preview:{" "}
                  {this.slugPreview(this.props.product.productName)}
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
                  this.props.product.productDescription &&
                  this.props.product.productDescription
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
        </form>
      </>
    );
  }
}

export default connect(mapStateToProps, null)(ProductInfor);
