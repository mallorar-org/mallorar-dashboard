import React, { Component } from "react";
import axios from "axios";

class FileUploading extends Component {
  state = {
    file: {},
    uploading: true,
  };

  componentDidMount = () => {
    this.setState({
      file: this.props.data,
    });




    let file = this.props.data;
    let formData = new FormData();
    formData.append("image", file, file.name)
    // console.log("==>",file)
    axios
      .post("/dashbaord/feupload", formData)
      .then(() => {
        // console.log("done");
        this.setState({
          uploading: false,
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
    // console.log("name", this.state);
    return (
      <div className="align-items-center col-12 d-flex">
        <div className="col-6 text-capitalize text-left text-truncate">{this.state.file.name}</div>
        <div className="col-4 ">{this.uploadStatus()}</div>
        <div className="col-2 ">{Math.round(this.state.file.size / 2048)} KB</div>
      </div>
    );
  }
}

export default FileUploading;
