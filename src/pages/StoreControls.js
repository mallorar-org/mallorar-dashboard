import React, { Component } from "react";
import Storeinformation from "../components/Admin/Storeinformation";
import Storefront from "../components/Admin/Storefront";
import Contactpage from "../components/Admin/Contactpage";
import { Link } from "react-router-dom";

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

  componentDidMount = () => {
    if (this.props.match.params.page === "general") {
      this.setState({
        activeItem: "1",
      });
    }
    if (this.props.match.params.page === "storefront") {
      this.setState({
        activeItem: "2",
      });
    }
    if (this.props.match.params.page === "contactpage") {
      this.setState({
        activeItem: "3",
      });
    }
  };

  renderComponent = () => {
    switch (this.props.match.params.page) {
      case "features":
        return <Storeinformation />;
      case "storefront":
        return <Storefront />;
      case "contactpage":
        return <Contactpage />;
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
      <section className="container-fluid px-3">
        <div className="mt-3">
          <div className="mt-4">
            <div className="text-secondary">Storefront / </div>
            <h1 className="bold mb-0 ml-h c-blue">Storefront</h1>
          </div>
          <div className="c-blue-">
            Control your store and storefront appearance from here
          </div>
          {/* <div className="c-blue- t14">(Enhanced features coming soon)</div> */}
        </div>
        <div className="ml-dash-order-tab-nav mt-3 c-blue-">
          <div className="border-bottom d-flex">
            <Link className="a-cancel" to="/store/general">
              <div
                to="#"
                onClick={this.toggle("1")}
                role="tab"
                className={this.pricingTabsCss("1")}
              >
                General
              </div>
            </Link>
            <Link className="a-cancel" to="/store/storefront">
              <div
                to="#"
                onClick={this.toggle("2")}
                role="tab"
                className={this.pricingTabsCss("2")}
              >
                Store Front
              </div>
            </Link>
            <Link className="a-cancel" to="/store/contactpage">
              <div
                to="#"
                onClick={this.toggle("3")}
                role="tab"
                className={this.pricingTabsCss("3")}
              >
                Contact Page
              </div>
            </Link>
          </div>
        </div>
        <div className="ml-dash-tab-item ">
          <div className="card card-body c-blue- mt-3 ml-card-shadow">
            {this.renderComponent()}
          </div>
        </div>
      </section>
    );
  }
}

export default Shop;
