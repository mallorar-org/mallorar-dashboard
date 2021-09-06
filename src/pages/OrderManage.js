import React, { Component } from "react";
import OrderItemLst from "../components/OrderItemLst/OrderItemLst";
import pex from "../assets/images/pex.jpg";
import axios from "axios";
import Loader from "./loading";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

dayjs.extend(LocalizedFormat);

toast.configure();

class OrderManage extends Component {
  state = {
    data: {},
    status: "",
    orderstatus: "",
    loading: true,
    OrderID: "",
    tracking: [],
    ordersitems: [
      {
        ItemId: "MP9736",
        itemImage: pex,
        itemName: "Nike Airmax",
        itemCost: "23.00",
        itemsQty: 2,
        itemsTotal: 23,
      },
      {
        ItemId: "MP9736",
        itemImage: pex,
        itemName: "Nike Vapor Max",
        itemCost: "23.00",
        itemsQty: 2,
        itemsTotal: 23,
      },
    ],
    orderShipping: {
      shippingType: "Local Shipping",
      shippingCost: "12",
    },
  };

  renderCurrentTmessage = () => {
    console.log(this.state);
    return "";
  };

  getOrder = () => {
    return axios
      .get(`/dash/order/${this.props.match.params.OrderId}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.getOrder()
      .then(() => {
        this.setState({ OrderID: this.props.match.params.OrderId });
      })
      .then(() => {
        this.status();
      });
  }

  status = () => {
    let status = "";
    let orderstatus = "";
    this.state.data.products.forEach((x) => {
      status = x.shippingStatus;
      orderstatus = x.status;
    });

    this.setState({
      status: status,
      orderstatus: orderstatus,
    });
  };

  handleShippingStatus = (e) => {
    e.preventDefault();
    let status = document.getElementById("slctShippingStatus").value;
    document.getElementById("btnSaveOrderStatus").innerHTML = "Updating..";
    document.getElementById("btnSaveOrderStatus").disabled = true;
    axios
      .get(`/dash/order/changeproorderstatus/${this.state.OrderID}/${status}`)
      .then(() => {
        console.log("done");
        this.getOrder().then(() => {
          document.getElementById("btnSaveOrderStatus").innerHTML = "Saved";
          document.getElementById("btnSaveOrderStatus").disabled = false;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toastNotify = (e, t) => {
    toast(e, { autoClose: 5000, position: "bottom-right", type: t });
  };

  updateTracking = (e) => {
    let tmessage = document.getElementById("tmessage").value;

    if (!tmessage) {
      return this.toastNotify(
        <div>
          <div className="bold h6 mb-0">Warning</div>
          <div>
            You can't update tracking information with an empty message, please
            say something
          </div>
        </div>,
        toast.TYPE.WARNING,
      );
    }

    e.target.innerHTML = "Saving";
    e.target.disabled = true;

    axios
      .post("/dash/updatetracking", {
        billingEmail: this.state.data.data.receiverEmail,
        orderNumber: this.state.OrderID,
        message: tmessage,
      })
      .then(() => {
        e.target.innerHTML = "Save";
        e.target.disabled = false;
        return this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Success</div>
            <div>Tracking information successfully updated</div>
          </div>,
          toast.TYPE.SUCCESS,
        );
      })
      .catch(() => {
        e.target.innerHTML = "Save";
        e.target.disabled = false;
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

  checkForm = () => {
    if (
      this.state.orderstatus === "awaiting_payment" ||
      this.state.orderstatus === "received"
    ) {
      document.getElementById("slctShippingStatus").disabled = true;
    }
  };

  orderShipping = () => {
    let total = 0;

    this.state.data.products.forEach((x) => {
      total += parseInt(x.shippingCost);
    });

    return total;
  };

  orderTotal = () => {
    let total = 0;

    this.state.data.products.forEach((x) => {
      total += x.productPrice * x.quantity;
    });

    return total;
  };
  overalTotal = () => {
    let total = 0;

    this.state.data.products.forEach((x) => {
      total +=
        parseInt(x.productPrice) * parseInt(x.quantity) +
        parseInt(parseInt(x.shippingCost));
    });

    return total;
  };
  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <section className="px-3">
        <div className="col-12 px-0 navbar rounded">
          <div className="">
            <div className="mt-4">
              <h1 className="bold mb-0 ml-h c-blue">
                Order {this.state.OrderID}{" "}
              </h1>
            </div>
            <div className="d-flex c-blue- ">
              <div>
                Order Placed on{" "}
                {dayjs(this.state.data.data.dateOfOrder).format("l LT")}
              </div>
            </div>
            <div className="my-2">
              <Link to="/orders">
                <button className=" ml-dash-btn mr-2 t15 c-blue- py-1 h30px  ml-shadow">
                  All orders
                </button>
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="ml-dash-btn mr-2 t15 c-blue- py-1 h30px ml-shadow"
              >
                Refresh Order
              </button>
              <button
                disabled
                className="ml-dash-btn t15 mr-2 c-blue- py-1 h30px  ml-shadow"
              >
                Send status email
              </button>
              <button
                disabled
                className="ml-dash-btn t15 mr-2 c-blue- py-1 h30px  ml-shadow"
              >
                Print Order
              </button>
            </div>
            <div className="c-blue--"></div>
            <div className="c-blue--">
              <strong>Note :</strong> For better customer experience, be sure to
              keep the order status updated
            </div>
          </div>
          {/* <div className="d-flex justify-content-center c-blue-">
            <div></div>

            <button className="mr-1" data-role="btn-icon">
              <img
                src={icons.solid.print.white}
                alt=""
                className="ml-center"
                style={{ width: "20px" }}
              />
            </button>
          </div> */}
        </div>
        <div className="mb-5 d-flex flex-wrap">
          <div className="col-lg-9 px-0 col-md-12">
            <div className="card ml-shadow mt-3 mr-lg-2">
              <div className="card-body">
                <h5 className="c-blue border-bottom pb-2">
                  <span className=" bold c-blue">General Information</span>
                </h5>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-6 px-0">
                      <div className="mt-2">
                        <h6 className="c-blue-">Order Number</h6>
                        <h6 className="ml-dash-order-iTX c-blue--">
                          -{this.state.OrderID}
                        </h6>
                        <h6 className="text-secondary c-blue--">
                          Receiver Name
                        </h6>
                        <h6 className="ml-dash-order-iTX">
                          -{this.state.data.data.receiverFirstName}
                        </h6>
                        <h6 className="text-secondary c-blue--">
                          Receiver Surname
                        </h6>
                        <h6 className="ml-dash-order-iTX">
                          -{this.state.data.data.receiverLastName}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-6 px-0">
                      <h6 className="text-secondary c-blue-- mt-2">
                        Customer Email
                      </h6>
                      <h6 className="ml-dash-order-iTX">
                        -{this.state.data.data.receiverEmail}
                      </h6>
                      <h6 className="text-secondary c-blue--">Date of Order</h6>
                      <h6 className="ml-dash-order-iTX">
                        -
                        {dayjs(this.state.data.data.dateOfOrder).format("l LT")}
                      </h6>
                      <h6 className="text-secondary c-blue--">Order Status</h6>
                      <h6 className="ml-dash-order-iTX">
                        -{this.state.data.data.paymentStatus}
                      </h6>
                      <h6 className="text-secondary c-blue-- d-none">
                        Order Total
                      </h6>
                      <h3 className="ml-dash-order-iT d-none">
                        <small className="text-secondary">R</small>{" "}
                        {this.orderTotal()}
                      </h3>
                    </div>
                  </div>
                  <div className="col-lg-4 d-none">
                    <h5 className="text-secondary">Billing Adress </h5>
                    <div className="mt-2">
                      <h6 className="text-secondary c-blue--">Adress Line 1</h6>
                      <h6 className="ml-dash-order-iTX">{`9937 Masowe Street`}</h6>
                      <h6 className="text-secondary c-blue--">
                        Adress Line 2{" "}
                      </h6>
                      <h6 className="ml-dash-order-iTX">{`Chitepo Ext`}</h6>
                      <h6 className="text-secondary c-blue--">State</h6>
                      <h6 className="ml-dash-order-iTX">N/A</h6>
                      <h6 className="text-secondary c-blue--">Postal Code</h6>
                      <h6 className="ml-dash-order-iTX">2240</h6>
                      <h6 className="text-secondary c-blue--">Country</h6>
                      <h6 className="ml-dash-order-iTX">Zimbabwe</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3 mr-lg-2 ml-shadow">
              <div className="card-body">
                <h5 className="c-blue border-bottom pb-2">
                  <span className=" bold c-blue">Shipping Address</span>
                </h5>
                <div className="mt-3">
                  <h6 className="text-secondary c-blue--">Adress Line 1</h6>
                  <h6 className="ml-dash-order-iTX">
                    -{this.state.data.data.receiverStreetAdress}
                  </h6>
                  <div className="row">
                    <div className="col-lg-6">
                      <h6 className="text-secondary c-blue--">
                        Adress Line 2{" "}
                      </h6>
                      <h6 className="ml-dash-order-iTX">
                        -{this.state.data.data.receiverComplexOrBuilding}
                      </h6>
                      <h6 className="text-secondary c-blue--">Suburb</h6>
                      <h6 className="ml-dash-order-iTX">
                        -{this.state.data.data.receiverSuburb}
                      </h6>
                      <h6 className="text-secondary c-blue--">City</h6>
                      <h6 className="ml-dash-order-iTX">
                        -{this.state.data.data.receiverCityOrTown}
                      </h6>
                    </div>

                    <div className="col-lg-6">
                      <h6 className="text-secondary c-blue--">State</h6>
                      <h6 className="ml-dash-order-iTX">
                        -{this.state.data.data.receiverProvince}
                      </h6>
                      <h6 className="text-secondary c-blue--">Postal Code</h6>
                      <h6 className="ml-dash-order-iTX">
                        -{this.state.data.data.receiverPostalCode}
                      </h6>
                      <h6 className="text-secondary c-blue--">Country</h6>
                      <h6 className="ml-dash-order-iTX">
                        -{this.state.data.data.receiverCountry}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="c-blue border-bottom pb-2">
                <span className="bold c-blue">Items</span>
              </h5>
              <div className="c-blue--">
                Showing items belonging to this order. Be sure to deliver items
                in time and update delivery status
              </div>
            </div>
            <div className="card ml-shadow mb-5 mt-3 mr-lg-2">
              <div className="bg-white text-center card border-0">
                <div className="d-flex flex-wrap c-blue- ml-table-header py-2  col-12 border-bottom">
                  <div className="col-2 text-center"></div>
                  <div className="col-2 text-center">-</div>
                  <div className="col-2 text-center">P. id</div>
                  <div className="col-2 text-center">Cost</div>
                  <div className="col-2 text-center">Qty</div>
                  <div className="col-2 text-center">Total</div>
                </div>
                {this.state.data.products.map((order, index) => (
                  <OrderItemLst
                    key={index}
                    ItemId={order.productId}
                    itemImage={order.productImg}
                    itemName={order.productName}
                    itemVar={order.selectedVar}
                    itemCost={order.productPrice}
                    itemsQty={order.quantity}
                    itemsTotal={order.productPrice * order.quantity}
                  />
                ))}
              </div>
              {/* <div>
                    <div className="table-responsive text-cente ml-table-alt">
                      <table className="tabl table-striped table-responsive">
             
                        <tbody className="ml-orders-body">
                         
                          <tr className="ml-dash-productlist-tr d-none">
                            <td>Shipping : </td>

                            <td>
                              <img
                                src={this.props.itemImage}
                                alt=""
                                className="ml-dash-productlist-thumbnail"
                              />
                            </td>
                            <td>
                            </td>
                              <div>{this.state.orderShipping.shippingType}</div>
                            <div>{this.state.orderShipping.shippingCost}</div>
                            <div>{this.state.orderShipping.shippingCost}</div>
                            <td>--</td>
                          </tr>
                        </tbody>
                      </table> 
                    </div>
                  </div> */}
              <div className=" bg-white">
                <div className="d-flex mt-3">
                  <div className="col-6 t16"></div>
                  <div className="mb-0 col-6 text-right">
                    <div className="d-flex mb-2">
                      <div className="col-6 px-0">Sub Total -</div>
                      <div className="col-6 bold"> $ {this.orderTotal()}</div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="col-6 px-0"> Shipping Payed -</div>
                      <div className="col-6 bold">$ {this.orderShipping()}</div>
                    </div>
                    <div className="d-flex border-top pt-2 mb-2">
                      <div className="col-6 px-0"> Order Total -</div>
                      <div className="col-6 bold"> $ {this.overalTotal()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 px-0 col-md-12">
            <div className=" col-md-6 col-lg-12 px-0 pl-lg-2 mt-3">
              <div className="card ml-shadow">
                <form onSubmit={this.handleShippingStatus}>
                  <div className="card-body p-3">
                    <h5 className="c-blue border-bottom pb-2">
                      <span className="bold c-blue">Status</span>
                    </h5>
                    <div className=" c-blue-">
                      Keep your customers updated on their order from you
                    </div>

                    <div className=" d-flex justify-content-center">
                      {this.checkForm()}
                      <select
                        defaultValue={this.state.status}
                        id="slctShippingStatus"
                        className="form-control w-100 mt-3 c-blue--"
                      >
                        <option value="pending">Pending</option>
                        <option value="delivering">Delivering</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-center p-2 mb-3">
                    {this.state.orderstatus === "awaiting_payment" ||
                    this.state.orderstatus === "received" ? (
                      ""
                    ) : (
                      <button
                        id="btnSaveOrderStatus"
                        className="ml-dash-btn no-outline px-5"
                      >
                        Save Status
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className=" col-md-6 px-0 pl-2 col-lg-12 mt-3">
              <div className="card ml-shadow">
                <div className="card-body p-3">
                  <h5 className="c-blue border-bottom pb-2">
                    <span className="bold c-blue">Tracking</span>
                  </h5>
                  <div className=" c-blue-">
                    Update tracking message when customers track this order
                  </div>
                  <div className="mt-2">
                    <div>
                      <div className="c-blue- mb-1">Order Number</div>{" "}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={this.state.OrderID}
                    />
                  </div>
                  <div className="mt-2">
                    <div>
                      <div className="c-blue- mb-1">Billing Email</div>{" "}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.data.data.receiverEmail}
                      disabled
                    />
                  </div>
                  <div>
                    <div className="mt-2">
                      <div className="c-blue- mb-1">Tracking Message</div>
                    </div>
                    <textarea
                      className="c-blue-- form-control ml-dash-tracking-inforODP"
                      // defaultValue={() => this.renderCurrentTmessage()}
                      id="tmessage"
                      placeholder="Tracking message here.."
                    ></textarea>
                  </div>
                </div>
                <div className=" text-center p-3">
                  <button
                    type="button"
                    onClick={this.updateTracking}
                    className="ml-dash-btn w-100 no-outline px-5"
                    id="btnUpdateTracking2"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 d-none px-0 pl-2 col-lg-12 mt-3 mb-5">
              <div className="card ml-shadow">
                <div className="card-body p-3">
                  <h5 className="c-blue border-bottom pb-2">
                    <span className="bold c-blue">Email Customer</span>
                  </h5>
                  <div className=" c-blue-">
                    Send an email to this customer for better communication on
                    this order
                  </div>
                  <div>
                    <div>
                      <div className="c-blue mt-2">Customer Email</div>
                    </div>
                    <input
                      type="text"
                      className="form-control c-blue--"
                      disabled
                      value="harmochiky2@gmail.com"
                    />
                  </div>
                  <div>
                    <textarea className="mt-2 ml-dash-tracking-inforODP form-control c-blue--">
                      Say something if you have to..
                    </textarea>
                  </div>
                </div>
                <div className="text-center card-footer bg-blueish">
                  <button
                    type="button"
                    className="ml-dash-btn w-100 no-outline px-5 mr-2"
                  >
                    Send Mail
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

export default OrderManage;
