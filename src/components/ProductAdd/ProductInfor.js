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
      <React.Fragment>
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
          <div className="mt-3 mr-2 card card-body ml-card-shadow">
            <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
              <CgDetailsLess className="ml-icon-size2 mr-2" />
              <span className="bold c-blue">Special Details</span>
            </h5>
            <div className="">
              <div className="mt-3 form-group">
                <div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      1).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        value={
                          this.props.product.productSD1 !== "default"
                            ? this.props.product.productSD1
                            : ""
                        }
                        onChange={this.onChangeFM}
                        id="productSD1"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      2).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        value={
                          this.props.product.productSD2 !== "default"
                            ? this.props.product.productSD2
                            : ""
                        }
                        onChange={this.onChangeFM}
                        id="productSD2"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      3).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        onChange={this.onChangeFM}
                        value={
                          this.props.product.productSD3 !== "default"
                            ? this.props.product.productSD3
                            : ""
                        }
                        id="productSD3"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      4).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        onChange={this.onChangeFM}
                        value={
                          this.props.product.productSD4 !== "default"
                            ? this.props.product.productSD4
                            : ""
                        }
                        id="productSD4"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      5).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        onChange={this.onChangeFM}
                        value={
                          this.props.product.productSD5 !== "default"
                            ? this.props.product.productSD5
                            : ""
                        }
                        id="productSD5"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(ProductInfor);
