import React, { Component } from "react";
import { MDBTabPane, MDBTabContent } from "mdbreact";
import OrderTable from "../components/OrderList/OrderTable";
import axios from "axios";
import Loading from "./loading";
import { toast } from "react-toastify";
import { navTitle } from "../store/actions/navTitles";
import { connect } from "react-redux";
import dayjs from "dayjs";
toast.configure();
class OverView extends Component {
  state = {
    loading: true,
    activeItem: "1",
    orderIDerr: "",
    trackingIDerr: "",
    trackinginforerr: "",
    data: [],
  };
  componentWillUnmount() {
    this.props.navTitle("");
  }

  toastNotify = (e, t) => {
    toast(e, {
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: true,
      draggable: true,
      position: "bottom-right",
      type: t,
    });
  };
  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  saveTracking = () => {
    let orderID = document.getElementById("orderID").value;
    let billingEmail = document.getElementById("billingEmail").value;
    let tInfor = document.getElementById("tInfor").value;

    if (!(orderID && billingEmail)) {
      return this.toastNotify(
        <div>
          <div className="bold h6 mb-0">Warning</div>
          <div>Please select an order number to update</div>
        </div>,
        toast.TYPE.WARNING,
      );
    }
    if (!tInfor) {
      return this.toastNotify(
        <div>
          <div className="bold h6 mb-0">Warning</div>
          <div>
            You probably forgot to add the tracking update, please tell your
            customer something
          </div>
        </div>,
        toast.TYPE.WARNING,
      );
    }

    document.getElementById("btnUpdateTracking").innerHTML = "Updating";
    document.getElementById("btnUpdateTracking").disabled = true;

    axios
      .post("/dash/updatetracking", {
        billingEmail: billingEmail,
        orderNumber: orderID,
        message: tInfor,
      })
      .then(() => {
        document.getElementById("btnUpdateTracking").innerHTML = "Update";
        document.getElementById("btnUpdateTracking").disabled = false;
        return this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Success</div>
            <div>Tracking information successfully updated</div>
          </div>,
          toast.TYPE.SUCCESS,
        );
      })
      .catch(() => {
        document.getElementById("btnUpdateTracking").innerHTML = "Update";
        document.getElementById("btnUpdateTracking").disabled = false;
        return this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Error</div>
            <div>
              We failed to updated tracking information, please try again or
              contact Mallorar support is this problem persists
            </div>
          </div>,
          toast.TYPE.ERROR,
        );
      });
  };

  orderSelect = (e) => {
    let email;
    this.state.data.forEach((x) => {
      if (x.orderNumber === e.target.value) {
        return (email = x.receiverEmail);
      }
    });
    if (email) {
      document.getElementById("billingEmail").value = email;
    } else {
      document.getElementById("billingEmail").value = "";
    }
  };

  componentDidMount = () => {
    axios
      .get("/dash/orders")
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.navTitle("Orders");
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
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section className="px-3 mb-5">
        <div className="mt-4">
          <h1 className="bold  ml-h c-blue">Orders</h1>
        </div>
        <div className="d-flex c-blue- ">
          <div>
            No. orders <span>{this.state.data.length}</span>
          </div>
          <div className="pl-2 ml-2 border-left">
            Last checked{" "}
            <span> {dayjs(new Date().toISOString()).format("L LT")}</span>{" "}
          </div>
        </div>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-12 pl-0 col-lg-9">
              <div className="mt-2">
                <div className="ml-dash-order-tab-nav  rounded">
                  <div className="c-blue nav-tabs d-flex">
                    <div
                      to="#"
                      onClick={this.toggle("1")}
                      role="tab"
                      className={this.pricingTabsCss("1")}
                    >
                      All Orders ({this.state.data.length})
                    </div>

                    <div
                      to="#"
                      // onClick={this.toggle("2")}
                      role="tab"
                      className={this.pricingTabsCss("2")}
                    >
                      Pending
                    </div>
                    <div
                      to="#"
                      // onClick={this.toggle("3")}
                      role="tab"
                      className={this.pricingTabsCss("3")}
                    >
                      Completed Orders
                    </div>
                  </div>
                </div>
                <div className="ml-dash-tab-item">
                  <MDBTabContent activeItem={this.state.activeItem}>
                    <MDBTabPane tabId="1" role="tabpanel">
                      <div className="mt-2 bg-white ml-table">
                        <OrderTable orders={this.state.data} />
                      </div>
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                      <div className="mt-2 bg-white ml-table">
                        <OrderTable orders={this.state.data} />
                      </div>
                    </MDBTabPane>
                    <MDBTabPane tabId="3" role="tabpanel">
                      <div className="mt-2 bg-white ml-table">
                        <OrderTable orders={this.state.data} />
                      </div>
                    </MDBTabPane>
                  </MDBTabContent>
                </div>
              </div>
              <div className="text-center py-4 bold">No orders yet</div>
            </div>

            <div className="col-lg-3 px-0 col-12">
              <div className=" mt-3 card ml-shadow rounded-0">
                <div className="bg-white card-header px-2  text-center text-secondary">
                  <h4 className="mb-0 c-blue bold ">Tracking</h4>
                  <div className="mb-0 c-blue-">
                    Easily update the tracking information
                  </div>
                </div>

                <div className="card-body p-2">
                  <div>
                    <div>
                      <label className=" text-secondary"> Order ID </label>{" "}
                    </div>
                    <select
                      id="orderID"
                      onChange={this.orderSelect}
                      required
                      className="form-control"
                    >
                      <option>Select Order</option>
                      {this.state.data.map((x, index) => (
                        <option key={index} value={x.orderNumber}>
                          {x.orderNumber}
                        </option>
                      ))}
                    </select>
                    <div className="text-danger">{this.state.orderIDerr}</div>
                  </div>
                  <div>
                    <div>
                      <label className="mt-2 text-secondary">
                        {" "}
                        Billing email{" "}
                      </label>{" "}
                    </div>
                    <input
                      id="billingEmail"
                      required
                      readOnly
                      className="form-control"
                      style={{ width: "100%" }}
                      type="text"
                    />
                    <div className="text-danger">
                      {this.state.trackingIDerr}
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="mt-2 text-secondary">
                        {" "}
                        Tracking Information{" "}
                      </label>{" "}
                    </div>
                    <textarea
                      id="tInfor"
                      placeholder="e.g Shipping"
                      className="ml-dash-tracking-inforODP form-control"
                    ></textarea>
                    <div className="text-danger">
                      {this.state.trackinginforerr}
                    </div>
                  </div>
                  <label className="text-center text-secondary">
                    {" "}
                    Add Tracking Message for your customers here{" "}
                  </label>
                </div>
                <div className="p-2 text-center">
                  <button
                    id="btnUpdateTracking"
                    onClick={this.saveTracking}
                    type="button"
                    className="ml-dash-btn w-100"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  navTitle,
};
export default connect(mapStateToProps, mapDispatchToProps)(OverView);
