import React, { Component } from "react";
import { connect } from "react-redux";
import check from "../../assets/images/check.svg";
import warning from "../../assets/images/warning.svg";
import alert from "../../assets/images/alert.svg";
import { close, notify } from "../MLNotify/controls";

const mapStateToProps = (state) => {
  return {
    notifier: state.admin.notifier,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class MLNotify extends Component {
  state = {
    open: true,
  };

  render() {
    "type 1 -  Success";
    "type 2 -  Warning/lert";
    "type 3 -  Danger";
    const data = this.props.notifier;
    return (
      <div
        style={{
          background:
            (data.type === 1 && "#1daf6c") ||
            (data.type === 2 && "#ce9a26") ||
            (data.type === 3 && "#cc2a2a"),
        }}
        className={`ml-notify-container rounded d-flex py-3  ${
          data.open && "ml-show-n"
        }`}
      >
        <img
          src={
            data.image === ""
              ? (data.type === 1 && check) ||
                (data.type === 2 && warning) ||
                (data.type === 3 && alert)
              : data.image
          }
          className="img-fluid rounded"
          alt=""
        />

        <div style={{ width: "100%" }} className="position-relative  ml-3">
          <div className="d-flex align-items-center justify-content-between">
            <div
              style={{ fontSize: "1.2rem" }}
              className="bold text-white  mb-0"
            >
              {data.head}
            </div>

            <span
              role="button"
              onClick={() => close()}
              className="position-absolute ml-ntfy-close text-white p-0 m-0 no-outline"
            >
              &times;
            </span>
          </div>

          <div className="text-white mt-1">{data.message}</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MLNotify);
