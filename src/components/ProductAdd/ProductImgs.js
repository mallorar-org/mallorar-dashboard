import React, { Component } from "react";
import PlaceHolderImage from "../../assets/images/addpicture.svg";
import FileSelector from "../../components/FileSelector/FileSelector";
import ProductImage from "../ProductAdd/ProductImage";
import { connect } from "react-redux";
import store from "../../store/store";

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
      50
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
      <div className="card ml-card-shadow overflow-hidden card-body card-block p-2 mt-3 ml-2">
        {this.FileSelector()}
        <div className="p-3 c-blue pb-0">
          Other Images <small>(click to change)</small>
        </div>
        <div className="mt-0">
          <div className="container-fluid ml-other-images">
            <div className="row border px-0 d-flex justify-content-center">
              <div className="col-6 p-2 border-bottom border-right">
                <div className="d-flex justify-content-center">
                  <img
                    onClick={this.selectpicO}
                    id="img1"
                    // onLoad={() => this.setState({ img1: "--htsp" })}
                    src={
                      this.props.product.img1 !== "default"
                        ? this.props.product.img1
                        : PlaceHolderImage
                    }
                  />
                </div>
              </div>
              <div className="col-6 p-2 border-bottom ">
                <div className="d-flex justify-content-center">
                  <img
                    onClick={this.selectpicO}
                    id="img2"
                    src={
                      this.props.product.img2 !== "default"
                        ? this.props.product.img2
                        : PlaceHolderImage
                    }
                  />
                </div>
              </div>
              <div className="col-6 p-2 border-right">
                <div className="d-flex justify-content-center">
                  <img
                    onClick={this.selectpicO}
                    id="img3"
                    src={
                      this.props.product.img3 !== "default"
                        ? this.props.product.img3
                        : PlaceHolderImage
                    }
                  />
                </div>
              </div>
              <div className="col-6 p-2 ">
                <div className="d-flex justify-content-center">
                  <img
                    onClick={this.selectpicO}
                    id="img4"
                    src={
                      this.props.product.img4 !== "default"
                        ? this.props.product.img4
                        : PlaceHolderImage
                    }
                  />
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
