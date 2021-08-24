import React, { Component } from "react";
import ProductList from "../components/productList/productlist";
import { getProducts, deleteSelectedProducts } from "../store/actions/actions";
import Loading from "../pages/loading";
import { connect } from "react-redux";
import { navTitle } from "../store/actions/navTitles";
import { Link } from "react-router-dom";
import icons from "../components/common/icons";
import MLSelect from "../components/MLSelect/MLSelect";
import ShortDescription from "../components/ProductManage/ShortDescription";

const mapStateToProps = (state) => {
  return {
    productPage: state.productAR.productPage,
    products_page: state.productAR,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (n) => dispatch(getProducts(n)),
    navTitle: (n) => dispatch(navTitle(n)),
    deleteSelectedProducts: (n) => dispatch(deleteSelectedProducts(n)),
  };
};

class Products extends Component {
  state = {
    loading: true,
    data: {},
    messageShow: "",
  };
  componentDidMount = () => {
    this.props.navTitle("Products");
    this.props.getProducts();
  };

  componentWillUnmount() {
    this.props.navTitle("");
  }

  productDeleted = (p) => {
    let currentPlist = this.state.data.products;
    let updatedPlist = currentPlist.filter((c) => c.PID !== p);
    let total = updatedPlist.length;
    this.setState({
      data: {
        total: total,
        products: updatedPlist,
      },
    });
  };

  messageShow = (m) => {
    this.setState({ messageShow: m.message });
  };

  removeMessage = () => {
    this.setState({
      messageShow: "",
    });
  };

  messageShowDisp = () => {
    if (this.state.messageShow) {
      return (
        <div className="mt-3 sufee-alert alert with-close alert-success alert-dismissible fade show">
          <span className="badge badge-pill badge-success mr-2">
            Operation Successful
          </span>
          {this.state.messageShow}
          <span
            onClick={this.removeMessage}
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </span>
        </div>
      );
    }
  };

  productListing = () => {
    if (this.props.productPage.products.length === 0) {
      return (
        <div className="d-flex justify-content-center">
          <div className=" m-5 ml-no-products d-block">
            <div className="d-flex justify-content-center">
              <h1 className="c-blue bold mb-2">No Products</h1>
            </div>
            <h6 className="text-secondary mb-3 ">
              Don't leave your store empty, add your first product and start
              selling now
            </h6>
            <div className="mt-2 d-flex justify-content-center">
              <span>
                <Link to="/products/add">
                  <button
                    type="button"
                    className="ml-dash-header-APBTN ml-dash-btn btn-md btn-md-text"
                  >
                    Add Product
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <ProductList
          messageShow={(m) => this.messageShow(m)}
          productDeleted={(p) => this.productDeleted(p)}
          products={this.props.productPage.products}
        />
      );
    }
  };

  render() {
    if (this.props.productPage.loading) {
      return <Loading />;
    }
    return (
      <section className="ml-container bg-white">
        {this.messageShowDisp()}
        import ShortDescription from "../ProductManage/ShortDescription";
        <ShortDescription />
        <div className="">
          <div className="">
            <div className="">
              <h1 className="bold mb-0 ml-h c-blue">Products</h1>
            </div>
            <div className="d-flex py-2">
              <div>
                No. products{" "}
                <span>{this.props.productPage.products.length}</span>
              </div>
              <div className="pl-2 ml-2 border-left">
                No. finished products 0
              </div>
              <div className="pl-2 ml-2 border-left">
                No. featured products 0{" "}
              </div>
            </div>
            <div className="">
              <Link to="/products/add">
                <button className=" ml-dash-btn btn mr-2 t15 c-blue- py-1 h30px  ml-shadow">
                  Create Product
                </button>
              </Link>
              <button
                onClick={() => this.props.getProducts()}
                className="ml-dash-btn mr-2 t15 c-blue- py-1 h30px ml-shadow"
              >
                Refresh
              </button>
              <button
                disabled
                className="ml-dash-btn mr-2 t15 c-blue- py-1 h30px ml-shadow"
              >
                View products analyics
              </button>

              {this.props.products_page.selectedProducts.length > 1 && (
                <button
                  onClick={this.props.deleteSelectedProducts}
                  className="ml-dash-bt bold btn btn-danger mr-2 t15 c-blue- py-1 h30px ml-shadow"
                >
                  Delete selected&nbsp;(
                  {this.props.products_page.selectedProducts.length})
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="bg-white ml-shadow">
            <div className="container-fluid ">
              <div className="row  px-0">
                <div className="col-2 d-flex justify-content-between align-items-center px-0 pr-2">
                  <div className="p-3">
                    <img
                      className="img-fluid mr-2 ml-icon-size1"
                      src={icons.solid.filter}
                    />
                    <span className="bold">Filters</span>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="66"
                      height="66"
                      viewBox="0 0 66 66"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        class="a"
                        points="29 66 28 66 38 33 28 0 29 0 39 33 29 66"
                        fill="#e6e9ed"
                      ></polygon>
                    </svg>
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center px-0 pr-2">
                  <div className="w-100">
                    <MLSelect bd={0} placeholder="Stock" />
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center px-0 pr-2">
                  <div className="w-100">
                    <MLSelect bd={0} placeholder="Category" />
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center px-0 pr-2">
                  <div className="w-100">
                    <MLSelect bd={0} placeholder="Product type" />
                  </div>
                </div>

                <div className="col-1 d-flex align-items-center px-0">
                  <div className="d-flex">
                    <button className="ml-dash-btn">Apply</button>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <div className="border-bottom w-100">
                    <input
                      type="search"
                      placeholder="Search by Product ID"
                      className="form-control border-0 rounded-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 px-0">
              <div className="ml-table text-center my-3">
                {this.productListing()}
              </div>
            </div>
          </div>
        </div>
        <div className="justify-content-end d-flex align-items-center ">
          Showing {this.props.productPage.products.length} items
          <button disabled className="ml-3 ml-dash-btn">
            &#171;
          </button>
          <input className="form-control ml-pg-i-b mx-2" value="1" />
          <button disabled className="ml-dash-btn">
            <span>&#187;</span>
          </button>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
