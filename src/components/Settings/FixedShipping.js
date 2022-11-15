import React, { Component } from "react";
import RegionSelector from "./RegionSelector";

class FixedShipping extends Component {
  state = {
    showRegions: true,
    selectedZone: "na",
  };

  regionSelector = () => {
    if (this.state.showRegions) {
      return (
        <RegionSelector
          close={() => this.setState({ showRegions: false })}
          selectedZone={this.state.selectedZone}
        />
      );
    }
  };

  selectRegions = () => {
    if (!(this.state.selectedZone === "na")) {
      this.setState({
        showRegions: true,
      });
    }
  };

  onZoneChange = (e) => {
    this.setState({
      selectedZone: e.target.value,
    });
  };
  render() {
    return (
      <div>
        {this.regionSelector()}
        <div className="p-2 mb-2 bg-blueish rounded mb-2">
          <div className="navbar">
            <div className="">
              <div className="h4 mb-0 c-blue-">Configure Fixed Shipping</div>
              <div className=" mb-0 c-blue-">
                Set a fixed shipping cost for the zones that you list below
              </div>
            </div>
            <div className="">
              <button className=" ml-dash-btn">Update/Save Settings</button>
            </div>
          </div>
        </div>
        <div className="container-fluid ">
          <div className="row d-flex align-items-center">
            <div className="col-9 c-blue-">
              Provide your shipping cost for all zones to be listed below in US$
            </div>
            <div className="col-3 d-flex align-items-center bold h4 c-blue-">
              $<input type="number" className="ml-2 form-control float-right" />
            </div>
          </div>
        </div>
        <div className="c-blue- card ml-card-shadow card-body  mt-3">
          <div className="row">
            <div className="col-4 pr-3">
              <div className="">Zone Name</div>
              <div className=" mt-2">
                <select className="form-control" onChange={this.onZoneChange}>
                  <option value="na">Select Zone</option>
                  <option value="United States">United States</option>
                  <option value="SA">South Africa</option>
                </select>
              </div>
            </div>
            <div className="col-4 pt-3">
              <button
                onClick={this.selectRegions}
                className="btn shadow-none ml-dash-btn px-5  mt-lg-3 "
              >
                Select Regions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FixedShipping;
