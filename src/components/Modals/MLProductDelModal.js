import React, { Component } from "react";
import { MDBModal, MDBModalBody } from "mdbreact";
import { IoIosCheckmark } from "react-icons/io";
import { RiAlarmWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  productModalControl,
  createNewProduct,
  confirmDeletion,
} from "../../store/actions/actions";
import store from "../../store/store";

const mapStateToProps = (state) => {
  return {
    productdelconfmodal: state.progress.productdelconfmodal,
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    productModalControl: (n) => dispatch(productModalControl(n)),
    createNewProduct: () => dispatch(createNewProduct()),
    confirmDeletion: () => dispatch(confirmDeletion()),
  };
};

class MLProductCreated extends Component {
  state = {};

  render() {
    return (
      <MDBModal size="lg" isOpen={this.props.productdelconfmodal}>
        <MDBModalBody className="py-5">
          <div
            style={{ borderColor: "orange" }}
            className="d-flex ml-i-c-p-c-s-s-t-c--o justify-content-center"
          >
            <RiAlarmWarningFill
              style={{
                border: "4px solid #ffc107",
              }}
              className="h1 mb-0 text-warning"
            />
          </div>
          <div className="text-center h4 mt-3 bold">Confirm deletion !</div>
          <div className="text-center mb-3">
            You just tried to delete a product in your store, are you sure you
            want to delete this product because this action may be irrivesable
            and you might loose potential customers for this product in Mallorar
            Online Mall. Continue ?
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-6 mb-4">
                <button
                  onClick={() => this.props.confirmDeletion()}
                  className="w-100 btn ml-dash-btn bg-danger"
                >
                  Yes, I'm sure delete product/s
                </button>
              </div>
              <div className="col-12 col-lg-6 mb-4">
                <button
                  onClick={() =>
                    store.dispatch({ type: "CLOSE_DEL_CONF_MODAL" })
                  }
                  className="w-100 btn ml-dash-btn"
                >
                  No, Cancel deletion
                </button>
              </div>
            </div>
          </div>
          <div
            onClick={() => store.dispatch({ type: "CLOSE_DEL_CONF_MODAL" })}
            className="text-center mt-2"
          >
            <Link to="/products">See all products &#x2192;</Link>
          </div>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MLProductCreated);
