import React, { Component } from "react";
import { Link } from "react-router-dom";
import General from "../components/Settings/General";
import Shipping from "../components/Settings/Shipping";
import FixedShipping from "../components/Settings/FixedShipping";
import ShippingZones from "../components/Settings/ShippingZones";
import UserItem from "../components/Settings/UserItem";
import icons from "../components/common/icons";

class ShopSetting extends Component {
  state = {
    activeItem: "1",
    page: "general",
  };
  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
    if ("1" === tab) {
      this.setState({
        page: "general",
      });
    }
  };

  configureFixedShipping = () => {
    this.setState({
      page: "fixedshipping",
    });
  };
  configureShippingZones = () => {
    this.setState({
      page: "shippingzones",
    });
  };

  renderPage = () => {
    if (this.state.page === "fixedshipping") {
      return <FixedShipping />;
    }
    if (this.state.page === "shippingzones") {
      return <ShippingZones />;
    }
    switch (this.props.match.params.page) {
      case "general":
        return <General />;
      case "shipping":
        return (
          <Shipping
            configureShippingZones={this.configureShippingZones}
            configureFixedShipping={this.configureFixedShipping}
          />
        );
      default:
        return <General />;
    }
  };

  componentDidMount = () => {
    let page = this.props.match.params.page;

    if (page === "general") {
      this.setState({
        activeItem: "1",
      });
    }
    if (page === "shipping") {
      this.setState({
        activeItem: "2",
      });
    }

    console.log(page);
  };

  pricingTabsCss(tab) {
    let cssRacho;
    if (tab === this.state.activeItem) {
      cssRacho = "p-3 bg-blueish ml-shadow bold c-blue";
    } else {
      cssRacho = "p-3 bg-blueish-oh  bold";
    }

    return cssRacho;
  }
  render() {
    return (
      <section className="ml-container">
        <div className="mrounded d-flex justify-content-between px-0">
          <div className="">
            <div className="">
              <Link className="a-cancel" to="/settings">
                Settings
              </Link>{" "}
              / {this.state.page}
            </div>
            <h1 className="c-blue bold mb-0 h1 ">Settings</h1>
          </div>
        </div>
        <div className="mt-3">
          <div className="ml-tabbed-content-wrapper">
            <div className="ml-tab-side ml-shadow">
              <div className="bg-white">
                <div className="">
                  <div className="p-3 text-secondary border-bottom  t14">
                    STORE
                  </div>
                  <Link className="a-cancel my-0 " to="/settings/general">
                    <div
                      to="#"
                      onClick={this.toggle("1")}
                      role="tab"
                      className={this.pricingTabsCss("1")}
                    >
                      <img
                        src={icons.solid.spunner.blue}
                        className="img-fluid ml-icon-size2 mr-2"
                      />

                      <span>General</span>
                    </div>
                  </Link>

                  <Link className="a-cancel my-0" to="/settings/shipping">
                    {" "}
                    <div
                      to="#"
                      onClick={this.toggle("2")}
                      role="tab"
                      className={this.pricingTabsCss("2")}
                    >
                      <span className="img-fluid ml-icon-size2 mr-2">
                        {icons.icon.globalpackage.blue}
                      </span>

                      <span>Shipping Zones</span>
                    </div>{" "}
                  </Link>
                  <Link className="a-cancel " to="/users/new">
                    {" "}
                    <div to="#" role="tab" className={this.pricingTabsCss("4")}>
                      <img
                        src={icons.solid.users.blue}
                        className="img-fluid ml-icon-size2 mr-2"
                      />
                      Team
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="ml-tab-content ml-shadow">
              <div className="ml-dash-tab-item">
                <div className="bg-white rounded-0 border-0 p-3 card-body ">
                  {this.renderPage()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ShopSetting;
