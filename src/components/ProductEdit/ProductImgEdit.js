import React, { Component } from "react";
import FileSelector from "../../components/FileSelector/FileSelector";
import PlaceHolderImage from "../../assets/images/addpicture.svg";

class ProductImg extends Component {
  state = {
    productImg: PlaceHolderImage,
    fileselector: false,
  };

  fileUrl = (x) => {
    this.setState({
      productImg: x,
    });
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

  componentDidMount() {
    this.props.onRef3(this);
    this.setState({
      productImg: this.props.data.productImg,
    });
  }
  componentWillUnmount() {
    this.props.onRef3(undefined);
  }

  captureData = () => {
    let image = this.state.productImg;

    if (image === PlaceHolderImage) {
      image = "default";
    }

    this.props.productImg({
      productImg: image,
    });
    // alert("woring")
    // console.log(this.state)
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
            <img id="productImg" src={this.state.productImg} alt="" />
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

export default ProductImg;
