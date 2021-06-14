import React, { Component } from "react";
import dayjs from "dayjs";
import Local from "dayjs/plugin/relativeTime";
import Loader from "../loadingItem/loadingItem";
import axios from "axios";
import LoadingItem from "../loadingItem/loadingItem";

dayjs.extend(Local);

class Message extends Component {
  state = {
    loading: true,
    messageId: "",
    senderFname: "",
    senderEmail: "",
    receiver: "",
    heading: "",
    dateSent: "",
    message: "",
    data: {},
    sRes: false,
  };

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    axios
      .get(`/dash/message/${this.props.data.messageID}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ messageId: this.props.data.messageID });
  };

  send = () => {
    let message = document.getElementById("response").value;

    document.getElementById("btnRep").innerHTML = "Sending..";
    document.getElementById("btnRep").disabled = true;

    if (message) {
      let response = {
        message: message,
        receiver: this.state.data.sender,
        head: "Reply : " + this.state.data.head,
      };

      this.setState({
        sRes: false,
      });
      axios
        .post("/dash/message/response", response)
        .then(() => {
          console.log("sent");
          this.setState({
            sRes: true,
          });
          document.getElementById("btnRep").innerHTML = "Send";
          document.getElementById("btnRep").disabled = false;
        })
        .catch((err) => {
          console.log(err);
          document.getElementById("btnRep").innerHTML = "Send";
          document.getElementById("btnRep").disabled = false;
        });
    } else {
      alert("Type a response first");
    }
  };

  componentDidUpdate = () => {
    if (this.state.messageId !== this.props.data.messageID) {
      this.setState({
        loading: true,
      });
      this.initialize();
    }
  };

  renderMessage = () => {
    if (this.state.loading) {
      return (
        <div className="position-relative w-100 pt-5 mt-5">
          <div className="d-flex justify-content-center w-100">
            <LoadingItem loader="2" />;
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="col-12  px-lg-3">
            <div className=" overflow-auto ml-message-box">
              <div className="mb-3 border-bottom pb-2">
                {" "}
                Phone Number : {this.state.data.phoneNumber}
              </div>
              {this.state.data.message}
            </div>
            <div className="row px-0">
              <div className="col-10 px-0">
                <input
                  type="text"
                  placeholder="Your response here.."
                  id="response"
                  className="border px-4 py-2 rounded-pill w-100"
                />
              </div>
              <div className="col-2 pr-0">
                <button
                  disabled
                  id="btnRep"
                  className="btn ml-dash-btn px-3 rounded-pill"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <div className="col-12 d-flex justify-content-between">
          <div className="col-6"></div>
          <div className="col-6 d-flex justify-content-end pr-0">
            <div className="rounded ml-background text-nowrap px-2 text-muted cursor border">
              Mark as Resolved
            </div>
          </div>
        </div>
        <div className="col-6 px-0 px-lg-3 d-flex align-items-center">
          <div className="ml-avator c-blue bold rounded-circle h4 mb-0  bg-blueish justify-content-center align-items-center d-flex mr-3">
            {this.props.data.fullName.charAt(0)}
          </div>
          <h6 className="mb-0 ml-title">{this.props.data.fullName}</h6>
        </div>
        <div className="col-6 text-md-right">
          {/* <span className="text-secondary cursor">Show all</span> */}
        </div>

        <div className="d-flex px-0 px-lg-3 flex-wrap my-2 col-12">
          <div className="col-6 pl-0">
            <span className="ml-time text-mutes text-muted">
              {dayjs(this.props.data.timeSent).fromNow()}
            </span>
          </div>
          <div className="pl-0 pl-lg-3 col-6"></div>
          <div className="pl-0 mt-3 col-12">
            <h4 className="ml-subject mb-0 bold c-blue">
              Head : {this.props.data.head}
            </h4>
          </div>
        </div>

        {this.renderMessage()}
      </>
    );
  }
}

export default Message;
