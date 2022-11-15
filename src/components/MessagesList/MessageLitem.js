import dayjs from "dayjs";
import React, { Component } from "react";

class Messagelitem extends Component {
  state = {};
  render() {
    return (
      <div
        onClick={() => this.props.setMessage(this.props.x.messageID)}
        className={`border-bottom ml-message-item align-items-center py-2 cursor ${
          this.props.active ? "ml-message-item_a" : ""
        } `}
      >
        <div className="px-0 position-relative pr-2">
          <span className="ml-dot-msg position-absolute">&#x2022;</span>
          <h6 className="ml-name c-blue- text-nowrap ml-title">
            {this.props.x.fullName}
          </h6>
          <div className="ml-message-info text-trucate overflow-hidden">
            {this.props.x.head}
          </div>
          <div className="px-0 text-nowrap text-muted text-right pr-2">
            {dayjs(this.props.x.timeSent).format("L LT")}
          </div>
        </div>
      </div>
    );
  }
}

export default Messagelitem;
