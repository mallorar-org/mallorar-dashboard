import React, { Component } from "react";
import LoadingItem from "../components/loadingItem/loadingItem";
import { beginTheBar, endTheBar } from "../components/loadingItem/loadingbar";

class Loader extends Component {
  state = {};

  componentDidMount() {
    beginTheBar();
  }

  componentWillUnmount() {
    endTheBar();
  }

  render() {
    const { loader, error } = this.props;
    if (error) {
      document.title = "#ERROR 9938 | Mallorar Dashboard";
      return (
        <div className="d-flex justify-content-center">
          <div className="ml-loading_Page p-5 m-5 ">
            <div className="mt-5 d-flex justify-content-center ">
              <h3 className="text-secondary">#ERROR 9938</h3>
            </div>
            <div className="d-flex justify-content-center ">
              <h5 className="text-secondary">Failed to Load Product</h5>
            </div>
          </div>
        </div>
      );
    }
    if (loader === "2") {
      return (
        <div className="d-flex justify-content-center">
          <div className="ml-loading_Page p-5 m-5 ">
            <div className="mt-5 d-flex justify-content-center ">
              <LoadingItem />
            </div>
            <div className="d-flex justify-content-center ">
              {/* <h5 className="text-secondary">Please Wait</h5> */}
            </div>
          </div>
        </div>
      );
    }
    if (loader === "3") {
      return (
        <div className="d-flex justify-content-center">
          <div className="ml-loading_Page  ">
            <div className=" d-flex justify-content-center ">
              <LoadingItem />
            </div>
            <div className="d-flex mt-4 justify-content-center ">
              <h5 className="c-blue bold">Hold on..</h5>
            </div>
          </div>
        </div>
      );
    }
    if (loader === "2") {
      return (
        <div className="d-flex justify-content-center">
          <div className="ml-loading_Page ">
            <div className="d-flex justify-content-center ">
              <LoadingItem loader={"2"} />
            </div>
            <div className="d-flex mt-5 justify-content-center ">
              <h5 className="text-secondary">Wait</h5>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="d-flex justify-content-center ">
          <LoadingItem loader={"2"} />
        </div>
      </div>
    );
  }
}

export default Loader;
