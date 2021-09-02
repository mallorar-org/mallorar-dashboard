import React, { useState } from "react";
import logo from "../assets/images/mallorar-logo-no-bg.png";

export default function Verify() {
  const [clicked, setClicked] = useState(false)
  return (
    <div className="container-fluid px-lg-5 py-3">
      <div className="mt-3 card card-body">
        <div className="align-items-center pb-5 row">
          <div className="col-lg-6 col-12 text-center mb-3">
            <img src={logo} alt="" style={{ maxHeight: "200px" }} className="img-fluid" />
          </div>
          <div className="col-lg-6 col-12 pr-lg-4 text-center text-center c-blue-">
            <h4 className="c-blue-">Verify Your Email Address</h4>
            <p>
              In order to start making or adding changes to your store, we require you to
              verification link to your email you used to sign up. Click the button below to request for the link.
              verify your email address for security reasons. We will send you a
                </p>
            <div className="mt-5 position-relative ml-verify-btns">
              <button className={`${clicked ? 'ml-btn-resend' : ""} btn no-outline position-absolute shadow-none px-3 ml-dash-btn `}>Resend</button>
              <button onClick={() => setClicked(true)} className={`${clicked ? 'ml-btn-verify' : ""} btn no-outline position-absolute shadow-none px-3 ml-dash-btn `}>Verify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
