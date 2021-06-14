import React, { Component } from "react";
import DragAndDrop from "../dragdrop";
import icons from "../../components/common/icons";

class SetUpDropZone extends Component {
  state = {
    currentStorageBucket: "mallorar.appspot.com",
  };

  smoothenizename = (n) => {
    let s = "";
    let extension = n
      .split(".")
      [n.split(".").length - 1].replace("?alt=media", "");
    s = n
      .replace(
        `https://firebasestorage.googleapis.com/v0/b/${this.state.currentStorageBucket}/o/`,
        ""
      )
      .replace("?alt=media", "")
      .replace(/-/g, " ");
    s = s.substring(0, s.indexOf("MI"));
    return s + "." + extension;
  };
  render() {
    return (
      <div className="ml-shadow p-2">
        <div className="bold c-blue">{this.props.title}</div>
        <div className="c-blue-">{this.props.text}</div>
        <div className="mt-3">
          <DragAndDrop
            set={this.props.fileUrl}
            handleDrop={this.props.handleDrop}
          >
            <div className="ml-dragin-container d-flex align-items-center justify-content-center">
              {this.props.fileUrl !== "" && this.props.name === null ? (
                <div className="text-center">
                  <div className="c-blue- mb-2">
                    <div className="my-2 align-items-center d-flex text-center">
                      <img
                        className="ml-d-i-i-t-d-f-b-o-s mr-2 py-1"
                        src={icons.solid.pdf.blue}
                        alt=""
                      />
                      <span style={{ fontSize: "17px" }} className="">
                        {this.smoothenizename(this.props.fileUrl)}
                      </span>
                    </div>
                  </div>
                  <div></div>
                </div>
              ) : (
                <>
                  {this.props.name === null ? (
                    <div className="text-center">
                      <div className="c-blue- mb-2">
                        Drop file or click to browse documents
                      </div>
                      <div></div>
                    </div>
                  ) : (
                    <div>
                      <div className="my-2 align-items-center d-flex text-center">
                        <img
                          className="ml-d-i-i-t-d-f-b-o-s mr-2 py-1"
                          src={icons.solid.pdf.blue}
                          alt=""
                        />
                        <span style={{ fontSize: "17px" }} className="">
                          {this.props.name.name}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </DragAndDrop>
        </div>
      </div>
    );
  }
}

export default SetUpDropZone;
