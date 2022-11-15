import React, { Component } from "react";
import { BiCalendar } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import DateRangePicker from "../components/Analytics/DateRangePicker";
import ProductAnalytics from "../components/Analytics/ProductAnalytics";
import RevenueAnalytics from "../components/Analytics/RevenueAnalytics";

class Analytics extends Component {
  state = {
    graphType: "line",
    page: "revenue",
  };

  renderAnalysisPage = () => {
    switch (this.state.page) {
      case "products":
        return (
          <ProductAnalytics
            changeGraph={(n) =>
              this.setState({
                graphType: n,
              })
            }
            graphType={this.state.graphType}
          />
        );
      case "revenue":
        return (
          <RevenueAnalytics
            changeGraph={(n) =>
              this.setState({
                graphType: n,
              })
            }
            graphType={this.state.graphType}
          />
        );
      default:
        return (
          <RevenueAnalytics
            changeGraph={(n) =>
              this.setState({
                graphType: n,
              })
            }
            graphType={this.state.graphType}
          />
        );
    }
  };

  componentDidUpdate = (prevProps) => {
    let page = this.props.match.params.page;
    if (prevProps.match.params.page !== page) {
      this.setState({
        page: page,
      });
    }
  };

  componentDidMount = () => {
    let page = this.props.match.params.page;
    if (page === "revenue" || page === "products" || page === "store") {
      this.setState({
        page: page,
      });
    } else {
      window.location.href = "/analytics/revenue";
      // alert("not available");
    }
  };

  render() {
    return (
      <div className="analysis">
        <div className="ml-container border-bottom  bg-white">
          <div className="">
            <div className="">
              <h1 className="bold mb-0 ml-h c-blue">Analytics</h1>
            </div>
            <div className="d-flex pb-0">
              <div>
                Use powerful technologies to study your store and product
                perfomance.
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="mt-3">
              <div className="bg-white ml-shadow">
                <div className="container-fluid ">
                  <div className="row  px-0">
                    <div className=" d-flex justify-content-between align-items-center px-0 pr-2">
                      <div className="px-3 d-flex text-center align-items-center">
                        <BiCalendar className="mr-2 h4 mb-0" />
                        <span className="mr-3 bold">Date Interval</span>
                        <DateRangePicker />
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="66"
                          height="66"
                          viewBox="0 0 66 66"
                          preserveAspectRatio="none"
                        >
                          <polygon
                            class="a"
                            points="29 66 28 66 38 33 28 0 29 0 39 33 29 66"
                            fill="#e6e9ed"
                          ></polygon>
                        </svg>
                      </div>
                    </div>

                    <div className="d-flex ml-button-tab align-items-center">
                      <NavLink to="/analytics/revenue" className="ml-btn mr-2 ">
                        Revenue Analysis
                      </NavLink>
                      <NavLink
                        to="/analytics/products"
                        className="ml-btn  mr-2"
                      >
                        Product Analysis
                      </NavLink>
                      <NavLink to="/analytics/store" className="ml-btn mr-2">
                        Store Analysis
                      </NavLink>
                      <button className="ml-btn mr-2">Restore</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-container">{this.renderAnalysisPage()}</div>
      </div>
    );
  }
}

export default Analytics;
