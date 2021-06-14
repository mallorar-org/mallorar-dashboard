import React, { Component } from "react";
import FileSelector from "../../components/FileSelector/FileSelector";
import PlaceHolderImage from "../../assets/images/addpicture.svg";
import store from "../../store/store";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

class ProductImg extends Component {
  state = {
    productImg: PlaceHolderImage,
    fileselector: false,
  };

  fileUrl = (x) => {
    store.dispatch({ type: "UPDATE_PRODUCT_IMG", payload: x });
  };

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

  selectpic = () => {
    this.setState({
      fileselector: true,
    });
  };

  render() {
    // console.log(this.state);
    return (
      <div className="card pt-3 ml-card-shadow p-2 card-body mt-3 card-block ml-2">
        {this.FileSelector()}
        <div className=" c-blue text-center">
          <h5 className="c-blue text-center mb-3 border-botto pb-0">
            <span className=" bold b-borde c-blue">Product Image</span>
          </h5>
          {/* <div>This will be displayed as the general product image</div> */}
        </div>
        <div className="mt-0">
          <div className="ml-dash-productimage d-flex rounded justify-content-center">
            <img
              id="productImg"
              src={
                this.props.product.productImg !== "default"
                  ? this.props.product.productImg
                  : PlaceHolderImage
              }
              alt=""
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={this.selectpic}
            className="ml-dash-btn w-100"
            // style={{ float: "right" }}
          >
            Select Image
          </button>
          {/* <button type="button" className="btn btn-green px-4 mr-2" style={{ float: "right" }}>Save</button> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductImg);
