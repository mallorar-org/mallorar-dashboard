import React, { Component } from "react";
import ProductDataEdit from "../components/ProductEdit/ProductDataEdit";
import ProductInforEdit from "../components/ProductEdit/ProductInforEdit";
import ProductImgEdit from "../components/ProductEdit/ProductImgEdit";
import ProductImgsEdit from "../components/ProductEdit/ProductImgsEdit";
import ProductDepartmentEdit from "../components/ProductEdit/ProductDepartmentEdit";
import ProductTagsEdit from "../components/ProductEdit/ProductTagsEdit";
import axios from "axios";
import dayjs from "dayjs";
import Loading from "./loading";
import { Link } from "react-router-dom";

class ProductAdd extends Component {
  state = {
    loading: true,
    activeItem: "1",
    productId: "",
    newPID: "",
    message: "",
    errmessage: "",
    productSlugPreview: "",
    productName: "", //
    productSlug: "", //
    productImg: "", //
    productDepartment: "", //
    productCategory: "", //
    childCategry: "", //
    productType: "", //
    sellingCurrency: "", //
    productPrice: "", //
    onSpecial: "false", //
    shippingCost: "", //
    shippingType: "", //
    stockfrom: "", //
    oldPrice: "0", //
    esShippingDates: "", //
    productSD1: "", //
    productSD2: "", //
    productSD3: "", //
    productSD4: "", //
    productSD5: "", //
    productVariables: [],
    productDescription: "", //
    dateCreated: "",
    img1: "", //
    img2: "", //
    img3: "", //
    img4: "", //
    iuc: false,
    productStock: "",
    creating: true,
    status: "",
    pCs: false,
    searchTags: [],
    showerror: "",
    variables: [],
    tags: [],
    productStock: "",
    isDiscounted: "",
    isFeatured: "false",
    dicPrice: "",
    updatedPrice: "",
  };

  refresh = () => {
    let productdId = this.props.match.params.productdId;
    this.setState({
      PID: productdId,
    });

    axios
      .get(`/dash/product/${productdId}/get`)
      .then((res) => {
        console.log("org", res.data);
        this.setState({
          productSlug: res.data.productSlug,
          productName: res.data.productName,
          variables: res.data.variables,
          cPName: res.data.productName,
          productSlug: res.data.productSlug,
          productImg: res.data.productImg,
          productDepartment: res.data.productDepartment,
          productCategory: res.data.productCategory,
          childCategry: res.data.childCategry,
          productType: res.data.productType,
          sellingCurrency: res.data.sellingCurrency,
          productPrice: res.data.productPrice,
          dateCreated: res.data.dateCreated,
          onSpecial: res.data.onSpecial,
          shippingCost: res.data.shippingCost,
          shippingType: res.data.shippingType,
          stockfrom: res.data.stockfrom,
          productStock: res.data.productStock,
          oldPrice: res.data.oldPrice,
          isFeatured: res.data.isFeatured,
          esShippingDates: res.data.esShippingDates,
          productSD1: res.data.description.productSD1,
          productSD2: res.data.description.productSD2,
          productSD3: res.data.description.productSD3,
          productSD4: res.data.description.productSD4,
          productSD5: res.data.description.productSD5,
          productDescription: res.data.description.productDescription,
          img1: res.data.productImages.img1,
          img2: res.data.productImages.img2,
          img3: res.data.productImages.img3,
          img4: res.data.productImages.img4,
          totalSales: res.data.totalSales,
          variables: res.data.variables,
          status: res.data.status,
          isDiscounted: res.data.isDiscounted,
          onSale: res.data.onSale,
          orderMax: res.data.orderMax,
          tags: [],
        });
        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          lerr: true,
          loading: false,
        });
      });
  };

  componentDidMount = () => {
    let productdId = this.props.match.params.productdId;
    this.setState({
      productId: productdId,
    });
    axios
      .get(`/dash/product/${productdId}/get`)
      .then((res) => {
        console.log("org", res.data);
        this.setState({
          productSlug: res.data.productSlug,
          productName: res.data.productName,
          status: res.data.status,
          variables: res.data.variables,
          cPName: res.data.productName,
          productSlug: res.data.productSlug,
          productStock: res.data.productSlug,
          productImg: res.data.productImg,
          productDepartment: res.data.productDepartment,
          productCategory: res.data.productCategory,
          childCategry: res.data.childCategry,
          productType: res.data.productType,
          sellingCurrency: res.data.sellingCurrency,
          productPrice: res.data.productPrice,
          dateCreated: res.data.dateCreated,
          onSpecial: res.data.onSpecial,
          shippingType: res.data.shippingType,
          stockfrom: res.data.stockfrom,
          productStock: res.data.productStock,
          oldPrice: res.data.oldPrice,
          isFeatured: res.data.isFeatured,
          esShippingDates: res.data.esShippingDates,
          productSD1: res.data.description.productSD1,
          productSD2: res.data.description.productSD2,
          productSD3: res.data.description.productSD3,
          productSD4: res.data.description.productSD4,
          productSD5: res.data.description.productSD5,
          productDescription: res.data.description.productDescription,
          img1: res.data.productImages.img1,
          img2: res.data.productImages.img2,
          img3: res.data.productImages.img3,
          img4: res.data.productImages.img4,
          totalSales: res.data.totalSales,
          variables: res.data.variables,
          status: res.data.status,
          isDiscounted: res.data.isDiscounted,
          onSale: res.data.onSale,
          orderMax: res.data.orderMax,
        });
        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          lerr: true,
          loading: false,
        });
      });
  };

  errormessage = () => {
    if (this.state.showerror) {
      return (
        <div className="alert alert-warning mb-3">
          <div className="navbar">
            <div className="">
              <div className="bold">Warning</div>
              <div className="">{this.state.showerror}</div>
            </div>
            <div className="">
              <button
                onClick={() => this.setState({ showerror: "" })}
                className="btn text-white btn-warning bold rounded-circle btn-lg"
              >
                X
              </button>
            </div>
          </div>
        </div>
      );
    }
  };
  successmessage = () => {
    if (this.state.success) {
      return (
        <div className="alert alert-success mb-3">
          <div className="navbar">
            <div className="bold">{this.state.success}</div>
            <div className="">
              <button
                onClick={() => this.setState({ success: "" })}
                className="btn text-white btn-success bold rounded-circle btn-lg"
              >
                X
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  onChangeFM = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getPinfor = (d) => {
    this.setState({ ...d });
  };

  getProductData = (d) => {
    this.setState({ ...d });
  };

  productImg = (d) => {
    this.setState({ ...d });
  };
  imgs = (d) => {
    this.setState({ ...d });
  };
  getDep = (d) => {
    this.setState({ ...d });
  };
  getTags = (d) => {
    this.setState({ searchTags: d });
  };

  changeDiscount = (e) => {
    this.setState({
      dicPrice: e.target.value,
    });
  };

  onDiscount = () => {
    if (this.state.isDiscounted === "false") {
      let price;
      let value;
      if (!this.state.dicPrice) {
        value = 0;
        price = this.state.productPrice;
      } else {
        value = parseFloat(this.state.dicPrice);
        let curPr = parseFloat(this.state.productPrice);
        price = (curPr - curPr * (value / 100)).toFixed(2);
      }

      this.setState({
        oldPrice: this.state.productPrice,
        productPrice: price,
        updatedPrice: price,
        isDiscounted: "true",
      });
    }
    if (this.state.isDiscounted === "true") {
      this.setState({
        isDiscounted: "false",
        oldPrice: this.state.productPrice,
        productPrice: this.state.oldPrice,
        isDiscounted: "false",
      });
    }

    console.log("es=>", this.state);
  };
  changeFeatured = () => {
    if (this.state.isFeatured === "false") {
      this.setState({
        isFeatured: "true",
      });
    }
    if (this.state.isFeatured === "true") {
      this.setState({
        isFeatured: "false",
      });
    }

    console.log("es=>", this.state);
  };

  doNOW = (callback) => {
    this.child1.captureData();
    this.child2.captureData();
    this.child3.captureData();
    this.child4.captureData();
    this.child5.captureData();
    this.child6.captureData();
    setTimeout(callback, 1000);
  };

  handleUpdate = () => {
    this.doNOW(this.updateProduct);
  };

  showerror = (n) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.setState({
      showerror: n,
    });
  };

  checkFields = () => {
    if (
      this.state.esShippingDates &&
      this.state.productName &&
      this.state.productSlug &&
      this.state.productImg &&
      this.state.productDepartment &&
      this.state.productCategory &&
      this.state.childCategry &&
      this.state.productType &&
      this.state.sellingCurrency &&
      this.state.productPrice &&
      this.state.onSpecial &&
      this.state.shippingCost &&
      this.state.shippingType &&
      this.state.stockfrom &&
      this.state.oldPrice &&
      this.state.esShippingDates &&
      this.state.productSD1 &&
      this.state.productSD2 &&
      this.state.productSD3 &&
      this.state.productSD4 &&
      this.state.productSD5 &&
      this.state.productDescription &&
      this.state.img1 &&
      this.state.img2 &&
      this.state.img3 &&
      this.state.img4
    ) {
      return true;
    } else {
      return false;
    }
  };

  updateProduct = () => {
    this.showerror("");
    this.setState({ message: "" });
    let productName = this.state.productName; //
    let productSlug = this.state.productSlug; //
    let productImg = this.state.productImg; //
    let productDepartment = this.state.productDepartment; //
    let productCategory = this.state.productCategory; //
    let productStock = this.state.productStock;
    let childCategr = this.state.childCategry; //
    let productType = this.state.productType; //
    let isFeatured = this.state.isFeatured;
    let sellingCurrency = this.state.sellingCurrency; //
    let productPrice = this.state.productPrice; //
    let onSpecial = this.state.onSpecial; //
    let shippingCost = this.state.shippingCost; //
    let shippingType = this.state.shippingType; //
    let status = this.state.status;
    let isDiscounted = this.state.isDiscounted;
    let stockfrom = this.state.stockfrom; //
    let oldPrice = this.state.oldPrice; //
    let esShippingDates = this.state.esShippingDates; //
    let productSD1 = this.state.productSD1; //
    let productSD2 = this.state.productSD2; //
    let productSD3 = this.state.productSD3; //
    let productSD4 = this.state.productSD4; //
    let productSD5 = this.state.productSD5; //
    let productDescription = this.state.productDescription; //
    let img1 = this.state.img1; //
    let img2 = this.state.img2; //
    let img3 = this.state.img3; //
    let img4 = this.state.img4;
    let tags = this.state.searchTags; //

    if (this.state.isDiscounted === "true") {
      productPrice = this.state.updatedPrice;
    }

    if (productDepartment === "select-department") {
      return this.showerror(
        "you probably forgot to assign your product to a department. Set your product to a specific department so that it can be found easily"
      );
    }
    if (productCategory === "choose-department") {
      return this.showerror(
        "you probably forgot to assign your product to a Category. Specific the product category so that it can be found easily"
      );
    }
    if (childCategr === "choose-category") {
      return this.showerror(
        "you probably forgot to assign your product to a Category. Specific the product category so that it can be found easily"
      );
    }

    if (stockfrom === "") {
      stockfrom = "default";
    }

    if (productPrice === "") {
      return this.showerror(
        "Wait, you probably forgot to give your product a price. Give a price of zero '0' if this product is free"
      );
    }
    if (productName === "default") {
      return this.showerror(
        "Your product deserves a name though :), give your product a name or title then continue"
      );
    }

    console.log("es", {
      productName: productName,
      productSlug: productSlug,
      productImg: productImg,
      productDepartment: productDepartment,
      productCategory: productCategory,
      childCategry: childCategr,
      productType: productType,
      status: status,
      sellingCurrency: sellingCurrency,
      productPrice: productPrice,
      onSpecial: onSpecial,
      shippingCost: shippingCost,
      shippingType: shippingType,
      stockfrom: stockfrom,
      oldPrice: oldPrice,
      esShippingDates: esShippingDates,
      productSD1: productSD1,
      productSD2: productSD2,
      productSD3: productSD3,
      productSD4: productSD4,
      productSD5: productSD5,
      isFeatured: isFeatured,
      productDescription: productDescription,
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
      tags: tags,
    });

    document.getElementById("btnUpdateProduct").disabled = true;
    document.getElementById("btnUpdateProduct").innerHTML = "Updating..";

    axios
      .post(`/dash/product/${this.state.productId}/edit`, {
        productName: productName,
        productSlug: productSlug,
        productImg: productImg,
        productDepartment: productDepartment,
        productCategory: productCategory,
        isDiscounted: isDiscounted,
        childCategry: childCategr,
        productType: productType,
        sellingCurrency: sellingCurrency,
        productPrice: productPrice,
        onSpecial: onSpecial,
        productStock: productStock,
        shippingCost: shippingCost,
        shippingType: shippingType,
        stockfrom: stockfrom,
        oldPrice: oldPrice,
        status: status,
        esShippingDates: esShippingDates,
        productSD1: productSD1,
        productSD2: productSD2,
        productSD3: productSD3,
        productSD4: productSD4,
        productSD5: productSD5,
        productDescription: productDescription,
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        tags: tags,
        isFeatured: isFeatured,
      })
      .then(() => {
        if (this.state.productVariables.length > 0) {
          return this.state.productVariables.map((x) => {
            axios.post("/dash/product/add/variable", {
              productId: this.state.productId,
              variableName: x.varibleName,
              variableValue: x.variables,
            });
          });
        }
      })
      .then(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        document.getElementById("btnUpdateProduct").innerHTML =
          "Update Product";
        document.getElementById("btnUpdateProduct").disabled = false;
        this.setState({
          success: `Product successfully Updated`,
        });
      })
      .catch((err) => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        console.log(err);
        document.getElementById("btnUpdateProduct").innerHTML =
          "ERROR#13 Retry";
        document.getElementById("btnUpdateProduct").disabled = false;
      });
  };

  changeStock = () => {
    if (this.state.productStock === "available") {
      this.setState({
        productStock: "nostock",
      });
    }
    if (this.state.productStock === "nostock") {
      this.setState({
        productStock: "available",
      });
    }

    console.log("es=>", this.state);
  };

  operationButtons = () => {
    return (
      <div className="card c-blue  ml-card-shadow card-block ml-2">
        <div className="p-3 border-bottom bold c-blue  h5 mb-0">Post</div>
        <div className="py-2">
          <div>
            <div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">Active : Yes</div>
                  <div className="col-6">
                    <label class="ml-switch">
                      <input type="checkbox" checked />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-6">In Stock : Yes</div>
                  <div className="col-6">
                    <label class="ml-switch">
                      <input
                        type="checkbox"
                        checked={
                          this.state.productStock === "available"
                            ? "checked"
                            : ""
                        }
                        onChange={this.changeStock}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>

                <div className="row mt- ">
                  <div className="col-6">
                    Featured : {this.state.isFeatured === "true" ? "Yes" : "No"}
                  </div>
                  <div className="col-6">
                    <label class="ml-switch">
                      <input
                        checked={
                          this.state.isFeatured === "true" ? "checked" : ""
                        }
                        type="checkbox"
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer bg-blueish">
          <button
            disabled
            id="btnUpdateProduct"
            type="button"
            className="btn ml-dash-btn w-100 px-5"
            style={{ float: "right" }}
          >
            Update Product
          </button>
        </div>
      </div>
    );
  };

  clearMessage = () => {
    this.setState({ message: "" });
    this.setState({ errmessage: "" });
  };

  messageShow = () => {
    if (this.state.message) {
      return (
        <div className="mt-3 sufee-alert alert with-close alert-success alert-dismissible fade show">
          <span className="badge badge-pill badge-success">
            Operation Successful
          </span>{" "}
          {this.state.message}
          <span
            onClick={this.clearMessage}
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

  errmessageShow = () => {
    if (this.state.errmessage) {
      return (
        <div className="mt-3 sufee-alert alert with-close alert-danger alert-dismissible fade show">
          <span className="badge badge-pill badge-danger">
            Operation Unsuccessful
          </span>{" "}
          {this.state.errmessage}
          <span
            onClick={this.clearMessage}
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

  setUIOh = () => {
    this.setState({ iuc: true });
  };

  render() {
    console.log(this.state);

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section className="ml-container ml-card-rounded-0 bg-white">
        {this.messageShow()}
        {this.errmessageShow()}
        <div>
          <div className="bg-whit  px-0 ">
            {this.errormessage()}
            {this.successmessage()}
            <div className="">
              <div className="mt-">
                <Link className="a-cancel" to="/products">
                  Products
                </Link>{" "}
                / {this.state.productId}
                <h1 className="bold mb-0 ml-h c-blue">Manage Product</h1>
              </div>
              <div className="d-flex c-blue- ">
                <div>Easily edit this product or set it to featured.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid my-3">
          <div className="row">
            <div className="col-lg-9 px-0">
              <div className="ml-shadow align-items-center d-flex justify-content-between bg-blueish p-3 mb-3 mr-2">
                <div className="d-flex c-blue-">
                  <span>
                    {" "}
                    Posted : {dayjs(this.state.dateCreated).format("lll")}
                  </span>
                </div>
                <div>
                  <button className="btn ml-btn mr-2 rounded-0 bold">
                    Set Out of Stock
                  </button>
                  <button className="btn ml-btn mr-2 rounded-0 bold">
                    Feature Product
                  </button>
                  <button className="btn btn-danger rounded-0 bold">
                    Delete Product
                  </button>
                </div>
              </div>
              <ProductInforEdit
                getPinfor={this.getPinfor}
                onRef1={(ref) => (this.child1 = ref)}
                data={this.state}
              />
              <ProductDataEdit
                refresh={this.refresh}
                getProductData={this.getProductData}
                onRef2={(ref2) => (this.child2 = ref2)}
                data={this.state}
              />
            </div>
            {/* Begining of Left SideBar and the */}
            <div className="col-lg-3 px-0">
              {this.operationButtons()}
              <ProductImgEdit
                productImg={this.productImg}
                onRef3={(ref3) => (this.child3 = ref3)}
                data={this.state}
              />
              <ProductImgsEdit
                imgs={this.imgs}
                onRef4={(ref4) => (this.child4 = ref4)}
                data={this.state}
              />
              <ProductDepartmentEdit
                getDep={this.getDep}
                onRef5={(ref5) => (this.child5 = ref5)}
                data={this.state}
              />
              <ProductTagsEdit
                getTags={this.getTags}
                onRef6={(ref6) => (this.child6 = ref6)}
                data={this.state}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProductAdd;
