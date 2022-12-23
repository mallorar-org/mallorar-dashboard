import React from "react";
import LoadingBar from "react-top-loading-bar";
import Logo from "../assets/images/logos/logo512.png";

export default function DashLoading({ onLoadingFinished, progress }) {
  return (
    <>
      <LoadingBar
        loaderSpeed={1200}
        className="ml-top-progress"
        progress={progress}
        onLoaderFinished={onLoadingFinished}
      />
      <div className="h-100 bg-white text-center w-100 d-flex align-items-center justify-content-center position-absolute">
        <div className="text-center">
          <div className=" justify-content-center">
            <div className="d-flex  justify-content-center">
              <img src={Logo} className="img-fluid ml-logo-o-l-scrin" alt="" />
            </div>
          </div>
          <div className="h5 mt-3 bold">
            <div className="ml-loading-container-1">
              <div
                style={{ width: `${progress}%` }}
                className="ml-loading-bar-2"
              ></div>
            </div>
            {/* <div className="mt-3 h4 c-blue- "></div> */}
          </div>
        </div>
        <div style={{ bottom: 50 }} className="position-absolute">
          <div className="d-flex  position-relative justify-content-between">
            <div className="bold">Martlyy Seller Centre</div>
          </div>
        </div>
      </div>
    </>
  );
}
