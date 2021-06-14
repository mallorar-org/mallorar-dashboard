import React, { Component } from 'react';
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

class MessageItem extends Component {
  state = {
    hover: false
  }


  hoverInItem = () => {
    this.setState({ hover: true });
  };
  mouseOut = () => {
    this.setState({ hover: false });
  };

  targetURL = () => {
    window.location.href = `/message/${this.props.messageid}`;
  };


  render() {
    return (
      <div
        onClick={this.targetURL}
        className='ml-table-row d-flex border-bottom align-items-center position-relative'
        onMouseEnter={this.hoverInItem}
        onMouseLeave={this.mouseOut}>
        <div className="col-4 pl-3">{this.props.senderFname}</div>
        <div className="col-5">{this.props.heading}</div>
        <div className="col-3">{dayjs(this.props.dateSent).fromNow()}</div>
        <div className="ml-center-Y ml-row-btn">
          <a className="c-blue-light" href={`/message/${this.props.messageid}`}>   Open    </a>
        </div>
      </div>
    );
  }
}

export default MessageItem;