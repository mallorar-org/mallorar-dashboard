import React, { Component } from "react";
import axios from "axios";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Status from "../common/Status";
import Tooltip from "../common/Tooltip";
import icons from "../common/icons";
import Modal from "../common/Modal";
import { Link } from "react-router-dom";

dayjs.extend(LocalizedFormat);

class OrderListItem extends Component {
  state = {
    hover: false,
    items: "loading..",
    isOpen: false,
  };

  componentDidMount = () => {
    axios
      .get(`/dash/order/howmany/${this.props.orderId}`)
      .then((data) => {
        this.setState({
          items: data.data + " item/s",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  hoverInItem = () => {
    this.setState({ hover: true });
  };
  mouseOut = () => {
    this.setState({ hover: false });
  };

  targetURL = () => {
    window.location.href = `/order/${this.props.orderId}`;
  };

  showModal = () => {
    console.log(this.state.isOpen);
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Link
        to={`/order/${this.props.orderId}`}
        onClick={this.showModal}
        className="ml-table-row d-flex a-cancel align-items-center position-relative"
        onMouseEnter={this.hoverInItem}
        onMouseLeave={this.mouseOut}
      >
        <div className="col-2 pl-3 d-flex justify-content-between">
          {this.props.orderId}
          <Tooltip text="view" className="cursor">
            <img
              src={icons.solid.eye.gray}
              alt=""
              className=""
              data-role="icon"
            />
          </Tooltip>
        </div>
        <div className="col-2">{dayjs(this.props.dateOfOrder).format("l")}</div>
        <div className="col-2">{this.props.shippingCountry}</div>
        <div className="col-2 d-flex align-items-center justify-content-center">
          {this.props.status === "awaiting_payment" ? (
            <div className="alert alert-success rounded-0 p-1 px-3 m-0">
              Processing
            </div>
          ) : (
            <div className="alert alert-danger rounded-0 p-1 px-3 m-0">
              Cancel
            </div>
          )}
        </div>
        <div className="col-2">{this.state.items}</div>
        <div className="col-2">
          <div className="ml-row-btn">
            <Link to={`/order/${this.props.orderId}`}>Edit</Link>
          </div>
        </div>
        <div className={this.state.isOpen ? "d-block" : "d-none"}>
          <Modal showModal={this.showModal}></Modal>
        </div>
      </Link>
    );
  }
}

export default OrderListItem;
