import React, { Component } from "react";
import WelcomeTab from "../setup/WelcomeTab";
import UploadDocs from "./UploadBusDoc";
import UploadPCDoc from "./UploadPCDoc";
import UploadPRDoc from "./UploadPRDoc";
import UpdateBanking from "./UpdateBanking";
import { connect } from "react-redux";
import Setup from "../../assets/images/Setup.png";
import icons from "../../components/common/icons";
import axios from "axios";
import dayjs from "dayjs";
import Locale from "dayjs/plugin/localizedFormat";

dayjs.extend(Locale);

const mapStateToProps = (state) => {
  return {
    core: state.core,
  };
};

class FinishSetUp extends Component {
  state = {
    activeItem: 1,
    progress: "0",
    verrRequested: this.props.core.verRequested === "true" ? true : false,
    requestPrompt: false,
    openDetails: false,
  };

  startRequesting = () => {
    document.getElementById("btnRV").innerHTML = "Sending request..";
    document.getElementById("btnRV").disabled = true;

    axios
      .get("/dash/rverification")
      .then(() => {
        document.getElementById("btnRV").innerHTML = "Requested";

        this.setState({
          requestPrompt: false,
          verrRequested: true,
        });
      })
      .catch(() => {
        document.getElementById("btnRV").innerHTML = "Try again";
        document.getElementById("btnRV").disabled = false;
      });
  };

  renderComponent = () => {
    switch (this.state.activeItem) {
      case 1:
        return this.HomeTab();
      case 2:
        return <UploadDocs done={() => this.setState({ activeItem: 1 })} />;
      case 3:
        return <UploadPCDoc done={() => this.setState({ activeItem: 1 })} />;
      case 4:
        return <UploadPRDoc done={() => this.setState({ activeItem: 1 })} />;
      case 5:
        return <UpdateBanking done={() => this.setState({ activeItem: 1 })} />;

      default:
        return this.HomeTab();
    }
  };

  verrRequested = () => {
    if (this.state.verrRequested) {
      return (
        <>
          <div>
            <h6 className="bold  mb-1 c-blue">Status : Pending Verification</h6>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-6">Requested on</div>
              <div className="col-6">
                {this.props.core.verRequestDate === ""
                  ? dayjs(new Date().toISOString()).format("lll")
                  : dayjs(this.props.core.verRequestDate).format("lll")}
              </div>
            </div>
            <div>
              <div
                onClick={() =>
                  this.setState({ openDetails: !this.state.openDetails })
                }
                className="cp a mb-2"
              >
                + more
              </div>
            </div>
            <div
              className={`form-group ${
                this.state.openDetails ? "d-block" : "d-none"
              }  `}
            >
              <div className="row">
                <div className="col-6">Store Name</div>
                <div className="col-6 text-capitalize">
                  {this.props.core.storeName}
                </div>
              </div>
              <div className="row">
                <div className="col-6">Store ID</div>
                <div className="col-6 text-capitalize">
                  {this.props.core.ShopID}
                </div>
              </div>
              <div className="row">
                <div className="col-6">Email</div>
                <div className="col-6 ">{this.props.core.adminEmail}</div>
              </div>
            </div>
          </div>

          <button disabled className="btn bold p-2 ml-btn">
            Verification Requested
          </button>
        </>
      );
    } else {
      return (
        <>
          <div>
            <h6 className="bold  mb-1 c-danger">Status : Not Verified</h6>
            <div
              onClick={() =>
                this.setState({ openDetails: !this.state.openDetails })
              }
              className="cp a mb-2"
            >
              + more
            </div>
          </div>
          <div
            className={`form-group ${
              this.state.openDetails ? "d-block" : "d-none"
            }  `}
          >
            <div className="row">
              <div className="col-6">Requested on</div>
              <div className="col-6">N/A</div>
            </div>

            <div className="row">
              <div className="col-6">Store Name</div>
              <div className="col-6 text-capitalize">
                {this.props.core.storeName}
              </div>
            </div>
            <div className="row">
              <div className="col-6">Store ID</div>
              <div className="col-6 text-capitalize">
                {this.props.core.ShopID}
              </div>
            </div>
            <div className="row">
              <div className="col-6">Email</div>
              <div className="col-6 ">{this.props.core.adminEmail}</div>
            </div>
          </div>

          {this.renderPercentage() === "100" ? (
            <button
              onClick={() => this.setState({ requestPrompt: true })}
              className="btn bold p-2 ml-btn"
            >
              Request verification
            </button>
          ) : (
            <button disabled className="btn bold p-2 ml-btn">
              Request verification
            </button>
          )}
        </>
      );
    }
  };

  requestPrompt = () => {
    if (this.state.requestPrompt) {
      return (
        <div className="modal pt-5">
          <div className="modal-content text-white p-4 shadow bg-blue col-6">
            <div className="d-flex justify-content-between">
              <div className="h2 bold border-bottom pb-2">Before we start</div>

              <div
                className="h3 cp mb-0 ml-x-m"
                onClick={() => this.setState({ requestPrompt: false })}
              >
                &times;
              </div>
            </div>
            <div className="mt-2">
              Please note we have a strong anti fraud policy that filters out
              any fraudulent sellers. We carry out verification by manually
              looking at all the data you submitted then confirm if you are able
              to become a Mallorar Seller or not. The Mallorar team will only
              get in touch with you if we need something from you or if we
              identify any issues on your data otherwise you will receive an
              email after a successful verification process.
            </div>
            <div className="mt-3">
              <div className="bold mb-2">
                Here's what to expect after requesting verification
              </div>
              <ul>
                <li>
                  You won't be able to request verification again unless if our
                  team reaches out to you.
                </li>
                <li>
                  Verification can take from 24hrs to 30 Days depending on if
                  you upload the correct required documents.
                </li>
                <li>
                  You wont be able to update uploaded documents during
                  verification so make sure you upload the correct ones
                </li>
              </ul>
            </div>
            <div className="mt-2">
              By clicking the confirm request button, you acknowledge that all
              the information and data you provided is correct and does not
              involve any fraud.
            </div>
            <div className="d-flex mt-3 justify-content-end">
              <button
                id="btnRV"
                onClick={this.startRequesting}
                className="btn ml-btn ml-card-shadow bold"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  renderNonBusiness = () => {
    switch (this.props.core.setupProgress) {
      case "60":
        return "0";
      case "65":
        return "50";
      case "70":
        return "100";
      default:
        return "0";
    }
  };

  renderBPercentage = (n) => {
    if (n) {
      switch (this.props.core.setupProgress) {
        case "60":
          return "0";
        case "65":
          return "333";
        case "70":
          return "667";
        case "75":
          return "100";
        default:
          return "0";
      }
    }

    switch (this.props.core.setupProgress) {
      case "60":
        return "0";
      case "65":
        return "33.3";
      case "70":
        return "66.6";
      case "75":
        return "100";
      default:
        return "0";
    }
  };

  renderPercentage = (n) => {
    if (
      this.props.core.sellerType !== "professional-seller" &&
      this.props.core.sellerType !== "brand"
    ) {
      return this.renderNonBusiness(n);
    }

    return this.renderBPercentage(n);
  };

  dotbutton = (c, num) => {
    if (c) {
      return (
        <div
          className={`rounded-circle ml-pulse  p-1 d-flex justify-content-center align-items-center ml-setup-progress-btn  text-white bg-success`}
        >
          <div className="ml-white-check"></div>
        </div>
      );
    } else {
      return (
        <div
          className={`rounded-circle  p-1 d-flex justify-content-center align-items-center ml-setup-progress-btn  text-white bg-blue`}
        >
          {num}
        </div>
      );
    }
  };

  HomeTab = () => {
    return (
      <>
        {this.requestPrompt()}
        <div className="ml-container">
          <h1 className="bold  mb-0 c-blue">Complete Setup</h1>
          <div className=" ml-s-h-t-subtext">
            Welcome to your dashboard. Please complete the following steps and
            request verification on your documents
          </div>
          <hr />
          <div className="mt-4">
            <div className="row">
              <div className="col-6">
                {this.props.core.sellerType === "professional-seller" ||
                this.props.core.sellerType === "brand" ? (
                  <div
                    onClick={() => this.toggle(2)}
                    className="d-flex mb-3 cp a-cancel align-items-center"
                  >
                    {this.props.core.storeData.uploadedBusinessRegistration ===
                    ""
                      ? this.dotbutton(false, "1")
                      : this.dotbutton(true, "1")}

                    <span className="ml-3 ml-s-h-t-subtext">
                      Upload Business Registration
                    </span>
                  </div>
                ) : undefined}

                <div
                  onClick={() => this.toggle(3)}
                  className="cp d-flex mb-3 align-items-center"
                >
                  {this.props.core.storeData.uploadedProofOfCitizenship === ""
                    ? this.dotbutton(false, "2")
                    : this.dotbutton(true, "2")}

                  <span className="ml-3 ml-s-h-t-subtext">
                    Upload Proof of Citizenship
                  </span>
                </div>
                <div
                  onClick={() => this.toggle(4)}
                  className="d-flex cp mb-3 align-items-center"
                >
                  {this.props.core.storeData.uploadedProofofResidence === ""
                    ? this.dotbutton(false, "3")
                    : this.dotbutton(true, "3")}
                  <span className="ml-3 ml-s-h-t-subtext">
                    Upload Proof of Residence
                  </span>
                </div>
                <div
                  // onClick={() => this.toggle(5)}
                  className=" cp mb-3 d-none align-items-center"
                >
                  {this.props.core.storeData.uploadedProofofResidence === ""
                    ? this.dotbutton(false, "4")
                    : this.dotbutton(true, "4")}
                  <span className="ml-3 ml-s-h-t-subtext">Deposits</span>
                </div>
                <div className="pt-4 border-top">{this.verrRequested()}</div>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div
                  style={{
                    fontSize: "10rem",
                  }}
                  class="charts-container"
                >
                  <div
                    class={`pie-wrapper position-relative progress-${this.renderPercentage(
                      true
                    )}`}
                  >
                    <span className="text-white text-center position-absolute ml-s-l-percentage-c">
                      {this.renderPercentage()}
                      <span class="smaller">%</span>
                      <div className="ml-t-s-se-pie">Completion</div>
                    </span>
                    <span class="label"></span>
                    <div class="pie">
                      <div class="left-side half-circle"></div>
                      <div class="right-side half-circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  navigate = (n) => {
    if (n === "next") {
      this.setState({
        activeItem: (parseInt(this.state.activeItem) + 1).toString(),
      });
    }
    if (n === "prev") {
      this.setState({
        activeItem: (parseInt(this.state.activeItem) - 1).toString(),
      });
    }
  };

  toggle = (tab) => {
    if (!this.state.verrRequested) {
      this.setState({
        activeItem: tab,
      });
    }
  };
  TabsCss(tab) {
    let cssRacho;
    if (tab === this.state.activeItem) {
      cssRacho = "ml-dash-PPtab ml-dash-PPtab-active bold px-4";
    } else {
      cssRacho = "ml-dash-PPtab px-4";
    }

    return cssRacho;
  }
  TabsCircleCss(tab) {
    let cssRacho;
    if (tab === this.state.activeItem) {
      cssRacho = "bg-success";
    } else {
      cssRacho = "bg-blue";
    }

    return cssRacho;
  }
  render() {
    return (
      <section className="h-100 bg-white">
        <div className=" ml-bg-pic border-bottom">
          <div className="bg-transtrad ml-container  py-2">
            <div className="d-flex  justify-content-between align-content-center">
              <div className=" w-100 d-flex  align-items-center justify-content-between">
                <div>
                  <h3 className="bold mb-0 c-blue">
                    Enhance your eCommerce game
                  </h3>
                </div>
                <div>
                  <img
                    src={icons.logo}
                    alt=""
                    className="ml-logo-s-u-i img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-4 row px-0">
          <div className="col-5 h-100 d-flex align-items-center">
            <div>
              <img src={Setup} className="img-fluid" />
            </div>
          </div>
          <div className="col-7 h-100 d-flex align-items-center">
            {this.renderComponent()}
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, null)(FinishSetUp);
