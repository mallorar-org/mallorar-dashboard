import axios from "axios";
import dayjs from "dayjs";
import React, { Component } from "react";
import { add_selected_Pictures_in_selector } from "../../store/actions/actions";
import FileUpload from "./FileUpload";
import ShowDocuments from "./ShowDocuments";
import ShowFiles from "./ShowFiles";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    selected_images_in_selector: state.productAR.selected_images_in_selector,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_selected_Pictures: () => dispatch(add_selected_Pictures_in_selector()),
  };
};
class FileSelector extends Component {
  state = {
    loading: true,
    activeItem: "1",
    selectimage: "",
  };

  add_selected_Pictures = () => {
    this.props.add_selected_Pictures();
    this.props.close();
  };

  selectPicture = () => {
    this.props.url(this.state.selectimage.fileUrl);
    this.props.close();
  };

  deleteImage = () => {
    document.getElementById("btnDel").innerHTML = "Deleting..";
    document.getElementById("btnDel").disabled = true;
    document.getElementById("btnSele").disabled = true;

    axios
      .get(`/dashbaord/fedelete/${this.state.selectimage.id}`)
      .then(() => {
        this.runCall();
        document.getElementById("btnDel").disabled = false;
        document.getElementById("btnSele").disabled = false;
        document.getElementById("btnDel").innerHTML = "Delete";
        this.setState({
          selectimage: "",
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  selectimage = (x) => {
    this.setState({
      selectimage: x,
    });
  };

  selecteditem = () => {
    if (this.state.selectimage) {
      const orU =
        "https://firebasestorage.googleapis.com/v0/b/mallorar.appspot.com/o/";
      const urlMask = "https://mallorar.imgix.net/";
      return (
        <>
          <div className="rounded p-2 text-center">
            <img
              style={{ height: " 200px" }}
              className="img-fluid"
              src={
                this.state.selectimage.fileType === "document"
                  ? "https://image.flaticon.com/icons/svg/337/337932.svg"
                  : this.state.selectimage.fileUrl.replace(orU, urlMask) +
                    "&height=130&q=60"
              }
              alt=""
            />
          </div>
          <div className="">
            <div className="border-bottom d-flex justify-content-between py-3">
              <div className="bold c-blue-">Title </div>
              <div className="c-blue-- text-truncate">
                {"-"}
                {this.state.selectimage.filename}{" "}
              </div>
            </div>

            <div className="border-bottom d-flex justify-content-between py-3">
              <div className="bold c-blue-">Uploaded</div>
              <div className="c-blue--">
                {dayjs(this.state.selectimage.uploadDate).format("lll")}
              </div>
            </div>
          </div>

          {this.state.selectimage.fileType === "document" ? undefined : (
            <div className="d-flex justify-content-end py-2">
              {this.props.selected_images_in_selector.length > 0 ? (
                <button
                  onClick={this.add_selected_Pictures}
                  className="ml-dash-btn px-4 mr-3"
                >
                  Add ({this.props.selected_images_in_selector.length}) selected
                </button>
              ) : (
                <button
                  id="btnSele"
                  onClick={this.selectPicture}
                  className="ml-dash-btn px-4 mr-3"
                >
                  Select
                </button>
              )}

              <button
                id="btnDel"
                onClick={this.deleteImage}
                className=" btn btn-danger px-4"
              >
                Delete
              </button>
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          {this.props.selected_images_in_selector.length > 0 ? (
            <div className="ml-center">
              <div className="text-secondary text-center py-2">
                {this.props.selected_images_in_selector.length} Photos selected
              </div>
              <div className="">
                <button
                  onClick={this.add_selected_Pictures}
                  className="ml-dash-btn px-4"
                >
                  Add ({this.props.selected_images_in_selector.length}) selected
                </button>
              </div>
            </div>
          ) : (
            <div className="text-secondary ml-center">Nothing selected</div>
          )}
        </>
      );
    }
  };

  // runCall = (callback) => {
  //   this.child.runCall();
  // };

  pageRender = () => {
    switch (this.state.activeItem) {
      case "1":
        return <FileUpload close={this.props.close} />;
      case "2":
        return (
          <ShowFiles
            onRef={(ref) => (this.child = ref)}
            selected={(x) => this.selectimage(x)}
          />
        );
      case "3":
        return (
          <ShowDocuments
            onRef={(ref) => (this.child = ref)}
            selected={(x) => this.selectimage(x)}
          />
        );
      default:
        return <FileUpload close={this.props.close} />;
    }
  };

  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  TabsCss(tab) {
    let cssRacho;
    if (tab === this.state.activeItem) {
      cssRacho = "ml-dash-PPtab ml-dash-PPtab-active";
    } else {
      cssRacho = "ml-dash-PPtab";
    }

    return cssRacho;
  }

  render() {
    // console.log(this.state);
    return (
      <div className="modal overflow-auto pt-5">
        <div className="rounded-0 ml-file-selector pt-3 modal-content">
          <div className="d-flex  px-3 justify-content-between">
            <div className="d-flex align-items-center">
              <div>
                <h5 className="c-blue bold mb-0">
                  File Explorer <small>v2.2.1</small>
                </h5>
                {/* <div className="">Browse and upload pictures or documents</div> */}
              </div>
            </div>

            <span
              onClick={() => this.props.close()}
              className="c-blue h2 mb-0 pb-1 cp"
            >
              &times;
            </span>
          </div>
          <div className=" c-blue ml-nav-shadow nav-tabs d-flex ">
            <div
              onClick={this.toggle("1")}
              role="tab"
              className={this.TabsCss("1")}
            >
              <i className=" fa fa-upload mr-1"></i> Upload New
            </div>
            <div
              onClick={this.toggle("2")}
              role="tab"
              className={this.TabsCss("2")}
            >
              <i className=" fa fa-image mr-1"></i> Pictures
            </div>
            <div
              onClick={this.toggle("3")}
              role="tab"
              className={this.TabsCss("3")}
            >
              <i className=" fa fa-file mr-1"></i> Documents
            </div>
          </div>
          <div className="container-fluid  ">
            <div className="row ">
              <div className="col-lg-8 ml-container border-top pt-0 p-md-2 mb-3 mb-md-0">
                {this.pageRender()}
              </div>
              <div className="col-lg-4 p-0 p-md-2 mb-3 mb-md-0 position-relative">
                <div className="border p-2 ml-shadow ml-img-view">
                  {/* {this.props.selected_images_in_selector.length} */}
                  {this.props.selected_images_in_selector.length > 0 ? (
                    <div className="ml-center">
                      {/* <div className="text-secondary text-center py-2">
                        {this.props.selected_images_in_selector.length} Photos
                        selected
                      </div> */}
                      <div className="">
                        <button
                          onClick={this.add_selected_Pictures}
                          className="ml-dash-btn px-4"
                        >
                          Add selected
                        </button>
                      </div>
                    </div>
                  ) : (
                    this.selecteditem()
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector);
