import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../pages/loading";
import SelectorImage from "./SelectorImage";

const mapStateToProps = (state) => {
  return {};
};

class ShowFiles extends Component {
  state = {
    loading: true,
    images: [],
    selected: "",
  };
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  runCall = () => {
    axios.get("/dash/getstorefiles").then((data) => {
      this.setState({
        images: data.data,
        loading: false,
      });
    });
  };

  componentDidMount = () => {
    this.props.onRef(this);
    axios
      .get("/dash/getstorefiles")
      .then((data) => {
        // console.log(data.data);
        this.setState({
          images: data.data,
          loading: false,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  selectImage = (n, x) => {
    this.setState({
      selected: n,
    });

    this.props.selected(x);
  };

  cssRacho = (n) => {
    if (this.state.selected === n) {
      return "ml-img-preview_a";
    } else {
      return "";
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div className="border-bottom pt-0 ml-image-selecter border-top- d-flex flex-wrap ml-modal-left-drawer">
        {this.state.images.map((x, index) => (
          <SelectorImage
            src={x.fileUrl}
            alt={x.fileUrl}
            url={x.fileUrl}
            className={this.cssRacho(index)}
            key={index}
            index={x.filename + index}
            onClick={() => this.selectImage(index, x)}
          />
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ShowFiles);
