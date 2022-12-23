import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceHolderImage from "../../assets/images/addpicture.svg";
import FileSelector from "../../components/FileSelector/FileSelector";
import store from "../../store/store";

const mapStateToProps = (state) => {
  return {
    product: state.product,
    selected_images_in_selector: state.productAR.selected_images_in_selector,
  };
};

class ProductImg extends Component {
  state = {
    productImg: PlaceHolderImage,
    fileselector: false,
  };

  fileUrl = (x) => {
    store.dispatch({ type: "UPDATE_MAIN_PRODUCT_PHOTO", payload: x });
  };

  selectpic = () => {
    this.setState({
      fileselector: true,
    });
  };

  render() {
    console.log(this.props.selected_images_in_selector.length);
    return (
      <div className="card ml-main-image-pc border p-2 card-body card-block">
        {this.state.fileselector ? (
          <FileSelector
            num_selected_images={this.props.selected_images_in_selector.length}
            url={(x) => this.fileUrl(x)}
            close={() => this.setState({ fileselector: false })}
          />
        ) : null}

        <div className=" c-blue text-center">
          <div className="c-blue text-center py-3 pb-0">
            <span className="">Main Photo</span>
          </div>
          {/* <div>This will be displayed as the general product image</div> */}
        </div>
        <div className="mt-0">
          <div className="ml-dash-productimage d-flex  justify-content-center">
            <div></div>
            <img
              id="productImg"
              src={
                this.props.product.product_images.length > 0
                  ? this.props.product.product_images[0].product_url
                  : PlaceHolderImage
              }
              alt=""
            />
            <div></div>
          </div>
        </div>
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={this.selectpic}
            className="ml-dash-btn w-100"
            // style={{ float: "right" }}
          >
            {this.props.product.product_images.length > 0
              ? "Change main photo"
              : "Select Images"}
          </button>
          {/* <button type="button" className="btn btn-green px-4 mr-2" style={{ float: "right" }}>Save</button> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductImg);
