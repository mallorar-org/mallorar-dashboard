import axios from "axios";
import React, { Component } from "react";
import Loading from "../../pages/loading";
import ShippingZone from "./ShippingZone";
import ZoneSelector from "./ZoneSelector";

class ShippingZones extends Component {
  state = {
    showZS: false,
    loading: true,
    currZones: [],
  };
  zoneSelector = () => {
    if (this.state.showZS) {
      return (
        <ZoneSelector
          reload={this.reload}
          close={() => this.setState({ showZS: false })}
        />
      );
    }
  };

  componentDidMount = () => {
    this.reload();
  };

  reload = () => {
    axios
      .get("/dash/getzones")
      .then((data) => {
        console.log(data.data);
        this.setState({
          loading: false,
          currZones: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="bg-blueish c-blue- p-2 h5 mb-0 bold">
            Loading Shipping Zones
          </div>
          <Loading loader={"2"} />;
        </div>
      );
    }
    return (
      <div>
        {this.zoneSelector()}
        <div className="p-2 mb-2 bg-blueish rounded mb-2">
          <div className="navbar">
            <div className="">
              <div className="h4 mb-0 c-blue-">Shipping Zones</div>
              <div className=" mb-0 c-blue-">
                Configure your shipping zones and pricing for all your zones
              </div>
            </div>
            <div className="">
              <button
                onClick={() => this.setState({ showZS: true })}
                className=" ml-dash-btn"
              >
                New Zone
              </button>
            </div>
          </div>
        </div>
        {this.state.currZones.map((x, index) => (
          <ShippingZone index={index} x={x} key={index} reload={this.reload} />
        ))}
      </div>
    );
  }
}

export default ShippingZones;
