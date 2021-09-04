import React, { Component } from "react";
import PlaceHolderImage from "../../assets/images/addpicture.svg";
import FileSelector from "../../components/FileSelector/FileSelector";
import ProductImage from "../ProductAdd/ProductImage";
import { connect } from "react-redux";
import store from "../../store/store";
import ProductImg from "./ProductImg";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ProductImgs extends Component {
  state = {
    img1: "default",
    img2: "default",
    img3: "default",
    img4: "default",
    fileselector: false,
    target: "",
  };

  captureData() {
    let img1 = this.state.img1;
    let img2 = this.state.img2;
    let img3 = this.state.img3;
    let img4 = this.state.img4;

    if (img1 === PlaceHolderImage) {
      img1 = "default";
    }
    if (img2 === PlaceHolderImage) {
      img2 = "default";
    }
    if (img3 === PlaceHolderImage) {
      img3 = "default";
    }
    if (img4 === PlaceHolderImage) {
      img4 = "default";
    }

    let imgs = {
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
    };

    this.props.imgs(imgs);
  }

  FileSelector = () => {
    if (this.state.fileselector) {
      return (
        <FileSelector
          url={(x) => this.fileUrl(x)}
          close={() => this.setState({ fileselector: false })}
        />
      );
    }
  };

  fileUrl = (x) => {
    this.setState({
      [this.state.target]: x,
    });

    setTimeout(
      () =>
        store.dispatch({ type: "UPDATE_PRODUCTS_IMGS", payload: this.state }),
      50,
    );
  };

  selectpicO = (e) => {
    let name = e.target.id;

    this.setState({
      fileselector: true,
      target: name,
    });
  };

  render() {
    // console.log(this.state);
    return (
      <div className="overflow-hidde  mt-3">
        {this.FileSelector()}
        <div className="container-fluid mb-3 px-0">
          <div className="row">
            <div className="col-2">Product Photos*</div>
            <div className="col-10">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4 px-0">
                    <ProductImg />
                  </div>
                  <div className="ml-pc-product-image-container px-0 border-left-0 border">
                    {this.props.product.product_images.map((x) => (
                      <div className="p-2 border ml-pc-product-image">
                        <div className="">
                          <img
                            className="img-fluid"
                            onClick={this.selectpicO}
                            src={x.product_url}
                          />
                        </div>
                      </div>
                    ))}

                    <div className="p-2 border ml-pc-product-image">
                      <div className="">
                        <img
                          className="img-fluid"
                          onClick={this.selectpicO}
                          src={PlaceHolderImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductImgs);
