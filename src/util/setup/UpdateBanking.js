import React, { Component } from "react";
import MLSelect from "../../components/MLSelect/MLSelect";
import { dashoverlay } from "../../store/actions/actions";
import {
  uploadingdoc,
  updateProofOfResidence,
} from "../../store/actions/sellerActions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    dashoverlay: (n) => dispatch(dashoverlay(n)),
    uploadingdoc: (n) => dispatch(uploadingdoc(n)),
    updateProofOfResidence: (n) => dispatch(updateProofOfResidence(n)),
  };
};

const mapStateToProps = (state) => {
  return {
    uploading_doc: state.progress.uploading_doc,
    core: state.core,
  };
};

class UpdateBanking extends Component {
  state = {
    businessDoc: null,
    proofOfCitizenShip: null,
    proofOfResidence: null,
    methods: [
      { value: "bank-deposit", label: "Bank deposit" },
      { value: "paypal-deposit", label: "Paypal deposit", isDisabled: true },
      {
        value: "hyperwallet-deposit",
        label: "Hyperwallet deposit",
        isDisabled: true,
      },
    ],
  };

  render() {
    return (
      <div className="p-2 w-100">
        <div className="h3 bold c-blue mb-2">Setup Deposits</div>
        <div className="c-blue-">
          Tell us how you intent to receive disbursements after sales.
          Disbursements can only be sent from Mallorar in USD($) although they
          might be received in your local currency depening on your bank and
          method of payout
          <div className="mt-3 text-success">
            <strong>NOTE :</strong> Your selecttion won't affect your
            verification so you can either select your payout method later or
            just set it now and we won't ask you to set it up when you gain full
            dashboard access
          </div>
        </div>
        <div className="mt-4 shadow p-3">
          <div className="form-group mb-0 d-flex align-items-center">
            <div className="col-sm-3 px-0">Deposit method</div>
            <div className="col-sm-9 p-0">
              <MLSelect
                options={this.state.methods}
                placeholder="Deposit method"
              />
            </div>
          </div>
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
            <button disabled className="btn mt-3 ml-dash-btn rounded">
              Submit document
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBanking);
