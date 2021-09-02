import React, { Component } from "react";
import Loading from "../pages/loading";
import ProductData from "../components/ProductAdd/ProductData";
import ProductInfor from "../components/ProductAdd/ProductInfor";
import ProductImg from "../components/ProductAdd/ProductImg";
import ProductImgs from "../components/ProductAdd/ProductImgs";
import ProductDepartment from "../components/ProductAdd/ProductDepartment";
import {
  updatetotalproducts,
  createProduct,
  editProduct,
} from "../store/actions/actions";
import ProductTags from "../components/ProductAdd/ProductTags";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import ProductInfomation from "../components/ProductAdd/ProductInfomation";
import ProductControls from "../components/ProductAdd/ProductControls";
import ProductManage from "../components/ProductAdd/ProductManage";
import store from "../store/store";
toast.configure();

const mapdispatchToProps = (dispatch) => {
  return {
    updatetotalproducts: () => dispatch(updatetotalproducts()),
    createProduct: () => dispatch(createProduct()),
    editProduct: (n) => dispatch(editProduct(n)),
  };
};

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ProductAdd extends Component {
  state = {
    page: "add",
  };

  componentDidMount = () => {
    let page = this.props.match.params.page;
    if (page.charAt(0) + page.charAt(1) === "MP") {
      let productdId = this.props.match.params.page;
      this.props.editProduct(productdId);
      return this.setState({
        page: page,
      });
    } else {
      if (page === "add") {
        if (this.props.product.productID) {
          store.dispatch({ type: "RESET_PRODUCT_STATE" });
        }
        this.setState({
          page: page,
        });
      } else {
        if (this.props.product.productID) {
          store.dispatch({ type: "RESET_PRODUCT_STATE" });
        }
        this.setState({
          page: "add",
        });
        return window.history.pushState("", null, "/products/add");
      }
    }
  };

  operationButtons = () => {
    if (this.props.product.productID) {
      return <ProductManage />;
    } else {
      return (
        <div className="card c-blue p-2 card-body ml-card-shadow card-block ml-2">
          <div className="card-body p-2">
            <h5 className="c-blue text-center mb-3 border-bottom pb-2">
              <span className=" bold b- c-blue">Actions</span>
            </h5>
            <div className="mb-1">
              <span>Status : </span>
              <span className="a">---</span>
            </div>
            <div className="mb-1">
              <span>Visibity : </span>
              <span className="a">Public</span>
            </div>
            <div className="mb-1">
              <span>Searchable : </span>
              <span className="a">Yes</span>
            </div>
          </div>
          <div className="px-3 pb-2 text-center ">
            <button
              onClick={this.handleCreate}
              type="button"
              className="btn ml-dash-btn w-100"
            >
              Create Product
            </button>
          </div>
        </div>
      );
    }
  };

  handleCreate = () => {
    this.props.createProduct();
  };

  renderHeader = () => {
    if (!this.props.product.productID) {
      return (
        <div className="">
          <div className="mt-">
            <Link className="a-cancel" to="/products">
              Products
            </Link>{" "}
            /{" "}
            <span className="text-capitalize">
              {this.props.product.productID
                ? this.props.product.productID
                : "Add"}
            </span>
            <h1 className="bold mb-0 ml-h c-blue">New Product</h1>
          </div>
          <div className="d-flex c-blue- ">
            <div>
              Create products and start selling, make sure you set the corrent
              shipping setting
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <div className="mt-">
            <Link className="a-cancel" to="/products">
              Products
            </Link>{" "}
            /{" "}
            <span className="text-capitalize">
              {this.props.product.productID
                ? this.props.product.productID
                : "Add"}
            </span>
            <h1 className="bold mb-0 ml-h c-blue">Manage Product</h1>
          </div>
          <div className="d-flex c-blue- ">
            <div>
              Easily update products and feature them to give them a boost
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    // console.log(this.state);

    if (!this.props.product.productID && this.state.page !== "add") {
      return "";
    }

    return (
      <section className="ml-container ml-card-rounded-0 bg-white">
        <div>
          <div className="bg-whit d-flex justify-content-between px-0 ">
            <div>{this.renderHeader()}</div>
            <div>
              {this.props.product.productID ? (
                <Link
                  onClick={() => this.setState({ page: "add" })}
                  to="/products/add"
                >
                  <button
                    onClick={() =>
                      store.dispatch({ type: "RESET_PRODUCT_STATE" })
                    }
                    className="ml-btn bold"
                  >
                    Create New
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() =>
                    store.dispatch({ type: "RESET_PRODUCT_STATE" })
                  }
                  className="ml-btn bold"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid my-3">
          <div className="row">
            <div className="col-lg-12 px-0">
              {this.props.product.productID && <ProductControls />}
              {/* <ProductInfor /> */}
              {/* <ProductInfomation /> */}
              <ProductData />
            </div>
            {/* Begining of Left SideBar and the */}
            <div className="col-lg-12 d-none px-0">
              {this.operationButtons()}
              <ProductImg />
              <ProductImgs />
              <div className="position-department-sticky">
                <ProductDepartment
                  getDep={this.getDep}
                  onRef5={(ref5) => (this.child5 = ref5)}
                />
                <ProductTags
                  getTags={this.getTags}
                  onRef6={(ref6) => (this.child6 = ref6)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapdispatchToProps)(ProductAdd);
