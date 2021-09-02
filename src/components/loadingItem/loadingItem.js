import React from "react";

const loadingItem = (props) => {
  if (props.loader === "2") {
    return (
      <div className="ml-loader-container w-100 h-100 d-flex position-absolute align-items-center justify-content-center">
        <div className="ml-loader-inner"></div>
      </div>
    );
  }

  return (
    <div className="ml-loader-container">
      <div className="ml-loader-inner"></div>
    </div>
  );
};

export default loadingItem;
