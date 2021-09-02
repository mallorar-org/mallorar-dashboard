import React, { Component } from "react";
import FileUploading from "./FileUploading.js";

class FileUpload extends Component {
  state = {
    selected: false,
    files: [],
  };

  loadPicture = e => {
    let files = e.currentTarget.files
    files = Array.from(files)
    this.setState({ files, selected: true });
  };

  selectpic = e => {
    e.preventDefault();
    var element1 = document.createElement("INPUT");
    element1.accept = "image/*";
    element1.type = "file";
    element1.multiple = true;
    element1.onchange = this.loadPicture;
    element1.click();
  };

  render() {
    return (
      <>
        <div className=" text-center ml-file-upload border-bottom-0 position-relative">
          {
            this.state.files.map((file, index) => (
              <div className='align-items-center d-flex flex-wrap ml-table-row'>
                <FileUploading id={index} key={index} data={file} />
              </div>
            ))
          }
          {this.state.files.length === 0 ? <button onClick={this.selectpic} className="bg-transparent ml-center ml-upload-icon no-outline cursor" >+</button> : undefined}
        </div>
        <div className="border border-top-0 rounded-bottom py-2 pr-2 d-flex justify-content-end">
          <button onClick={this.selectpic} className="px-3 cursor py-1 ml-dash-btn no-outline">Upload</button>
        </div>
      </>
    );
  }
}

export default FileUpload;
