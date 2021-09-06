import React, { Component } from "react";
import Storeinformation from "../components/Admin/Storeinformation";
import StorePayouts from "../components/Admin/StorePayouts";

class Shop extends Component {
  state = {
    activeItem: "1",
  };
  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  renderComponent = () => {
    switch (this.props.match.params.page) {
      case "store":
        return <Storeinformation />;
      case "payouts":
        return <StorePayouts />;
      default:
        return <Storeinformation />;
    }
  };

  pricingTabsCss(tab) {
    let cssRacho;
    if (tab === this.state.activeItem) {
      cssRacho = "ml-dash-PPtab ml-dash-PPtab-active";
    } else {
      cssRacho = "ml-dash-PPtab";
    }

    return cssRacho;
  }
  render() {
    return (
      <section className="container-fluid px-1 px-lg-3 mb-5">
        <div className="mt-3">
          <div className="mt-4">
            <div className="text-secondary">Admin / </div>
            <h1 className="bold mb-0 ml-h c-blue">Admintration</h1>
          </div>
          <div className="c-blue-">
            All your admintrative controls exist here
          </div>
        </div>
        <div className="mt-3 ml-dash-order-tab-nav border-bottom bold c-blue- rounded">
          <div className=" nav-tabs d-flex">
            <div
              onClick={this.toggle("1")}
              role="tab"
              className={this.pricingTabsCss("1")}
            >
              Store Information
            </div>

            <div
              onClick={this.toggle("3")}
              role="tab"
              className={this.pricingTabsCss("3")}
            >
              Payouts
            </div>
          </div>
        </div>
        <div className="ml-dash-tab-item">
          <div className="card card-body c-blue- mt-3 ml-card-shadow">
            <div>Under Development...</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Shop;
