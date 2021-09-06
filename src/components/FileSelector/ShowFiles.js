import React, { Component } from "react";
import Loader from "../../pages/loading";
import axios from "axios";
import { connect } from "react-redux";

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
    axios.get("/dashbaord/getstorefiles").then((data) => {
      this.setState({
        images: data.data,
        loading: false,
      });
    });
  };

  componentDidMount = () => {
    this.props.onRef(this);
    axios
      .get("/dashbaord/getstorefiles")
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

    const orU =
      "https://firebasestorage.googleapis.com/v0/b/mallorar.appspot.com/o/";
    const urlMask = "https://mallorar.imgix.net/";
    // console.log(this.state);
    return (
      <div className="border-bottom pt-0 ml-image-selecter border-top- d-flex flex-wrap ml-modal-left-drawer">
        {this.state.images.map((x, index) => (
          <div
            className={`${this.cssRacho(
              index,
            )} col-6 p-2 col-md-4 col-lg-3 text-center`}
            key={index}
          >
            <img
              src={x.fileUrl.replace(orU, urlMask) + "&height=130&q=60"}
              alt={x.fileUrl}
              onClick={() => this.selectImage(index, x)}
              className={` ml-img-preview`}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ShowFiles);
