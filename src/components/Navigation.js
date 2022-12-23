import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import icons from "./common/icons";

const mapStateToProps = (state) => {
  return {
    stname: state.core.storeName,
    // stname: "es",
  };
};

function Navigation({ stname, handleNav, navState, resize, title }) {
  return (
    <div className="ml-nav border-bottom d-flex justify-content-between position-sticky align-items-center px-4">
      <div className="align-items-center d-flex">
        <button
          data-role="btn-icon"
          onClick={handleNav}
          className="mr-3 bg-white d-none"
          data-action={
            resize
              ? navState
                ? "close-sidebar"
                : "open-sidebar"
              : navState
              ? "close-sidebar"
              : "open-sidebar"
          }
        >
          <img
            src={icons.solid.menu.open.gray}
            alt=""
            className="ml-center"
            style={{ width: "20px" }}
          />
        </button>
        <div>
          <div
            style={{
              fontSize: "20px",
            }}
            className="mb-0 c-blue text-capitalize bold"
          >
            {stname}
          </div>
          {/* <div className="t14">Signin - harmochiky2@gmail.com</div> */}
        </div>
      </div>

      {/* <div className="t14">Mallorar Dashboard v1.3</div> */}
      <div className="d-flex align-items-center">
        <Link className="position-relative" to="/messages">
          <img
            src={icons.solid.message.gray}
            alt=""
            className="mr-3 ml-nav-image-se "
          />
          <div className="bg-blue position-absolute ml-dot-navt-message"></div>
        </Link>

        <Link className="mr-3 a-cancel" to="/users/new">
          <div className=" text-whit bold ml-t-n-u-n d-flex  text-capitalize justify-content-center align-items-center rounded-circle  bold a-cancel">
            {stname.charAt(0)}
          </div>
        </Link>
        <button disable className="ml-btn isabled py-1">
          Upgrade
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(Navigation);
