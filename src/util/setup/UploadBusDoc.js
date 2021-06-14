import React, { Component } from "react";
import SetUpDropZone from "./SetUpDropZone";
import { dashoverlay } from "../../store/actions/actions";
import {
  updateBusinessDocument,
  uploadingdoc,
} from "../../store/actions/sellerActions";
import { connect } from "react-redux";
import axios from "axios";

const mapDispatchToProps = (dispatch) => {
  return {
    dashoverlay: (n) => dispatch(dashoverlay(n)),
    uploadingdoc: (n) => dispatch(uploadingdoc(n)),
    updateBusinessDocument: (n) => dispatch(updateBusinessDocument(n)),
  };
};

const mapStateToProps = (state) => {
  return {
    uploading_doc: state.progress.uploading_doc,
    core: state.core,
  };
};

class UploadDocs extends Component {
  state = {
    businessDoc: null,
    proofOfCitizenShip: null,
    proofOfResidence: null,
  };

  handleDrop1 = (file) => {
    this.setState({ businessDoc: file });
  };

  startuploading = () => {
    let file = this.state.businessDoc;
    let formData = new FormData();
    formData.append("file", file, file.name);
    // console.log("==>",file)
    this.props.dashoverlay(true);
    this.props.uploadingdoc(true);
    axios
      .post("/dashbaord/feupload?return=true", formData)
      .then((data) => {
        console.log(data.data);
        this.props.updateBusinessDocument(data.data.fileAt);
      })
      .catch(() => {
        this.props.dashoverlay(false);
        // console.log(err);
      });

    // this.props.dashoverlay(true);
    // this.props.done();
  };

  render() {
    return (
      <div className="p-2 w-100">
        <div className="h3 bold c-blue mb-2">Business Registration</div>
        <div className="c-blue-">
          Must clearly show the business name that matches the one you used
          during signup
          <div>
            <strong>Why this document ?,</strong> We need to verify that this is
            a legit business that complies with our terms and conditions.
          </div>
        </div>
        <div className="mt-3">
          <SetUpDropZone
            fileUrl={this.props.core.storeData.uploadedBusinessRegistration}
            title="Upload Business Document"
            text="Document must be a scanned ( .pdf ) file of the original copy"
            handleDrop={(n) => this.handleDrop1(n)}
            name={this.state.businessDoc}
          />
        </div>

        <div className=" mt-4">
          <div className="text-secondary">
            By submitting this document, you agree that this document has the
            most correct information with no fraud. We will be able to detect
            any fraud.
          </div>
          <div className="d-flex mt-3 justify-content-between">
            <button
              onClick={() => this.props.done()}
              className="btn mt-3 ml-btn bold rounded"
            >
              Go back
            </button>
            {this.props.uploading_doc ? (
              <button
                id="btnUploadDocs"
                disabled
                className="btn mt-3 ml-dash-btn rounded-pill"
              >
                Submitting document
              </button>
            ) : (
              <>
                {this.state.businessDoc ? (
                  <button
                    id="btnUploadDocs"
                    onClick={this.startuploading}
                    className="btn mt-3 ml-dash-btn rounded-pill"
                  >
                    Submit document
                  </button>
                ) : (
                  <button disabled className="btn mt-3 ml-dash-btn rounded">
                    Submit document
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocs);
