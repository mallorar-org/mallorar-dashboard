import React, { Component } from "react";
import skills from "../../assets/images/skills.svg";
import Pspecifics from "../ProductAdd/Pspecifics";
import CreateTemplate from "../ProductAdd/Specifics/SpecificsTemplate";
import { MDBModal, MDBModalBody } from "mdbreact";
import { connect } from "react-redux";
import store from "../../store/store";

const mapStateToProps = (state) => {
  return {
    productAR: state.product,
  };
};

class ProductInfomation extends Component {
  state = {
    templateModal: false,
    activeItem: "1",
    specifications: [],
  };

  changeBrand = (e) => {
    store.dispatch({ type: "UPDATE_BRAND", payload: e.target.value });
  };

  setFields = (e) => {
    let ns = [];
    ns = ns.concat(e, this.props.productAR.product_specifications);
    store.dispatch({ type: "SET_SPECS_FIELDS", payload: ns });
    this.setState({
      templateModal: false,
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

  removeslItem = (e) => {
    let ftd = [];
    this.props.productAR.product_specifications.forEach((x) => {
      if (e !== x) {
        ftd.push(x);
      }
    });

    setTimeout(
      () => store.dispatch({ type: "SET_SPECS_FIELDS", payload: [] }),
      50,
    );
    setTimeout(
      () => store.dispatch({ type: "SET_SPECS_FIELDS", payload: ftd }),
      100,
    );

    //   store.dispatch({ type: "SET_SPECS_FIELDS", payload: [] });
  };
  renderComponent = () => {
    switch (this.state.activeItem) {
      default:
        return <CreateTemplate setFields={(n) => this.setFields(n)} />;
    }
  };

  Templates = () => {
    return (
      <MDBModal size="lg" isOpen={this.state.templateModal}>
        <MDBModalBody className="p-0">
          <div
            style={{ minHeight: "32rem" }}
            className="ml-container py-2 px-1"
          >
            <div className="d-flex px-3  justify-content-between">
              <div className="bold h4 mb-0 d-flex align-items-center">
                <img alt="" className="ml-icon-size1 mr-2" src={skills} />
                <div>
                  <div>Specification Templates</div>
                  <div className="t14">Create or browse common templates</div>
                </div>
              </div>
              <button
                onClick={() =>
                  this.setState({ templateModal: !this.state.templateModal })
                }
                className="bold i-i-btn btn cp h3 mb-0"
              >
                &times;
              </button>
            </div>
            <div className="mt-2 border-top">
              <div>
                <div className="ml-dash-tab-header-APP nav-tabs  bg-blueish d-flex">
                  <div
                    to="#"
                    onClick={this.toggle("1")}
                    role="tab"
                    className={this.pricingTabsCss("1")}
                  >
                    Create Template
                  </div>

                  <div
                    to="#"
                    // onClick={this.toggle("2")}
                    role="disabled"
                    className={this.pricingTabsCss("12")}
                  >
                    Saved Templates
                  </div>
                  <div
                    to="#"
                    // onClick={this.toggle("3")}
                    role="disabled"
                    className={this.pricingTabsCss("13")}
                  >
                    Global
                  </div>
                </div>
              </div>
              <div className="px-2 py-3">{this.renderComponent()}</div>
            </div>
          </div>
        </MDBModalBody>
      </MDBModal>
    );
  };
  render() {
    return (
      <div className="my-3">
        {this.Templates()}
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-2">
              <div className="d-flex align-items-center pb-2">
                <span>Product Specifications</span>
              </div>
            </div>
            <div className="col-10">
              <div>
                <p className="text-secondary">
                  We recommend you to provide product specifics as they are
                  important to customers when browsing and filtering products.
                </p>
              </div>
              <div className="mt-2">
                <div className="container-fluid my-3">
                  <div className="row">
                    <div className="col-12 px-0 border-bottom mb-3">
                      <div className="my-2 bold h6">Suggested</div>
                      <form autocomplete="off" className="d-flex my-3 ">
                        <div class="form-group d-flex align-items-center">
                          <label for="Student" className="mr-3 mb-0">
                            Brand :
                          </label>
                          <input
                            onChange={this.changeBrand}
                            name="brand"
                            placeholder="e.g Nike"
                            type="text"
                            className="ml-input"
                          />
                        </div>
                      </form>
                    </div>

                    <div className="w-100 px-0 pt-0 mt-0 col-8 ttable-striped">
                      <table className="table table-bordered ">
                        <tr className="bold bg-light">
                          <td>Field Name</td>
                          <td>Specification</td>
                          <td>Action</td>
                        </tr>
                        {this.props.productAR.product_specifications.map(
                          (x, index) => (
                            <Pspecifics
                              index={index}
                              removeslItem={(n) => this.removeslItem(n)}
                              x={x}
                            />
                          ),
                        )}
                        {this.props.productAR.product_specifications.length ===
                          0 && (
                          <tr className="p-0">
                            <td className="p-3 border  justify-content-center align-items-center">
                              No specifications created
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  Click the button below to add specification fields to this
                  product
                </div>
                <button
                  onClick={() =>
                    this.setState({ templateModal: !this.state.templateModal })
                  }
                  className="btn ml-btn mt-2"
                >
                  Add Fields
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductInfomation);
