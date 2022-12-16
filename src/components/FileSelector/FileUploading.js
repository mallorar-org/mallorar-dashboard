import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { select_image_in_selector } from "../../store/actions/actions";
import CheckBox from "../common/CheckBox";
import * as uuid from "uuid";

const mapDispatchToProps = (dispatch) => {
  return {
    select_image_in_selector: (n) => dispatch(select_image_in_selector(n)),
  };
};

class FileUploading extends Component {
  state = {
    file: {},
    uploading: true,
    url: "",
    selected: false,
  };

  select_image = () => {
    this.props.select_image_in_selector(this.state.url);
    this.setState({
      selected: !this.state.selected,
    });
  };

  componentDidMount = () => {
    this.setState({
      file: this.props.data,
    });

    let file = this.props.data;
    let formData = new FormData();
    formData.append("image", file, file.name);

    axios
      .post("/dash/feupload?return=true", formData)
      .then((data) => {
        console.log(data.data);
        this.setState({
          uploading: false,
          url: data.data.fileAt,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  uploadStatus = () => {
    if (this.state.uploading) {
      return (
        <div className="ml-progress-container">
          <div className="marquee">
            <div className="ml-progress-bar"></div>
          </div>
        </div>
      );
    } else {
      return <span>Complete</span>;
    }
  };

  render() {
    if (!this.state.uploading) {
      return (
        <div className="align-items-center w-100 col-12 d-flex">
          <div className=" d-flex w-100 align-items-center justify-content-between  text-left text-truncate">
            <div className="d-flex align-items-center">
              <CheckBox
                id={this.state.file.name.replace(/ /g, "-")}
                checked={this.state.selected}
                onchange={this.select_image}
              />{" "}
              <img
                alt=""
                src={this.state.url}
                className="img-fluid ml-product-img ml-2 mr-2"
              />
              <span>{this.state.file.name}</span>
            </div>
            <div>
              {this.state.selected ? (
                <button
                  onClick={this.select_image}
                  className="btn-danger btn-sm btn"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={this.select_image}
                  className="ml-dash-btn btn-sm btn"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      // console.log("name", this.state);
      return (
        <div className="align-items-center col-12 d-flex">
          <div className="col-6 text-left text-truncate">
            {this.state.file.name}
          </div>
          <div className="col-4 ">{this.uploadStatus()}</div>
          <div className="col-2 ">
            {Math.round(this.state.file.size / 2048)} KB
          </div>
        </div>
      );
    }
  }
}

export default connect(null, mapDispatchToProps)(FileUploading);
