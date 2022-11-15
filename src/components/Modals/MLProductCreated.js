import { MDBModal, MDBModalBody } from "mdbreact";
import React, { Component } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  createNewProduct,
  editProduct,
  productModalControl,
} from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    productcsmodal: state.progress.productcsmodal,
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    productModalControl: (n) => dispatch(productModalControl(n)),
    createNewProduct: () => dispatch(createNewProduct()),
    editProduct: () => dispatch(editProduct()),
  };
};

class MLProductCreated extends Component {
  state = {};

  render() {
    return (
      <MDBModal size="lg" isOpen={this.props.productcsmodal}>
        <MDBModalBody className="py-3">
          <div className="d-flex ml-i-c-p-c-s-s-t-c--o justify-content-center">
            <IoIosCheckmark className="h1 mb-0 text-success" />
          </div>
          <div className="text-center h4 mt-3 bold">
            Product Successfully Created
          </div>
          <div className="text-center mb-3">
            Your product has successfully created in Mallorar Online Mall.
            Choose what you want to do next by clicking on of the options below.
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-6 mb-4">
                {this.props.product.productID ? (
                  <button
                    onClick={() => this.props.editProduct()}
                    className="w-100 btn ml-dash-btn"
                  >
                    Edit &amp; feature product
                  </button>
                ) : (
                  <Link to="/products">
                    <button
                      onClick={() => this.props.editProduct()}
                      className="w-100 btn ml-dash-btn"
                    >
                      Edit &amp; feature product
                    </button>
                  </Link>
                )}
              </div>
              <div className="col-12 col-lg-6 mb-4">
                <button
                  onClick={() => this.props.createNewProduct()}
                  className="w-100 btn ml-dash-btn"
                >
                  Create new product
                </button>
              </div>
            </div>
          </div>
          <div
            onClick={() => this.props.productModalControl(false)}
            className="text-center mt-2"
          >
            <Link to="/">Go to the homepage &#x2192;</Link>
          </div>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MLProductCreated);
