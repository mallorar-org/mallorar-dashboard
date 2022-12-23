import React, { Component } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { connect } from "react-redux";
import PlaceHolderImage from "../../assets/images/addpicture.svg";
import FileSelector from "../../components/FileSelector/FileSelector";
import { remove_photo } from "../../store/actions/actions";
import store from "../../store/store";
import ProductImg from "./ProductImg";

const mapStateToProps = (state) => {
  return {
    product: state.product,
    selected_images_in_selector: state.productAR.selected_images_in_selector,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove_photo: (index) => dispatch(remove_photo(index)),
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

  fileUrl = (x) => {
    store.dispatch({ type: "ADD_PRODUCT_PHOTO", payload: x });

    // this.setState({
    //   [this.state.target]: x,
    // });

    // setTimeout(
    //   () =>
    //     store.dispatch({ type: "UPDATE_PRODUCTS_IMGS", payload: this.state }),
    //   50,
    // );
  };

  selectpicO = (e) => {
    this.setState({
      fileselector: true,
    });
  };

  render() {
    // console.log(this.state);

    return (
      <div className="overflow-hidde  mt-3">
        {this.state.fileselector ? (
          <FileSelector
            num_selected_images={this.props.selected_images_in_selector.length}
            url={(x) => this.fileUrl(x)}
            close={() => this.setState({ fileselector: false })}
          />
        ) : null}

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
                        <div className="d-flex align-items-center ml-top-bar justify-content-between">
                          <div></div>
                          <div onClick={() => this.props.remove_photo(x.index)}>
                            <IoIosRemoveCircle />
                          </div>
                        </div>
                        <div className="">
                          <img
                            className="img-fluid"
                            alt=""
                            src={x.product_url}
                          />
                        </div>
                      </div>
                    ))}

                    {this.props.product.product_images.length <= 8 && (
                      <>
                        <div className="p-2 border mb-0 pb-0 ml-pc-product-image">
                          <div className="">
                            <img
                              alt=""
                              className="img-fluid mb-0 pb-0"
                              onClick={this.selectpicO}
                              src={PlaceHolderImage}
                            />
                          </div>
                          <div></div>
                        </div>
                      </>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductImgs);
