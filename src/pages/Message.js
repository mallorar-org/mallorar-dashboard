import React, { Component } from "react";
import axios from "axios";
import Loading from "./loading";
import dayjs from "dayjs";

class Message extends Component {
  state = {
    loading: true,
    messageId: "",
    senderFname: "Harmony",
    senderEmail: "harmochiky2@gmail.com",
    receiver: "malloraadmin@gmail.com",
    heading: "Heads Up",
    dateSent: "12/12/2019",
    message: "Thank you for the awesome app",
    data: {},
    sRes: false,
  };

  alert = () => {
    if (this.state.sRes) {
      return (
        <div className="alert alert-success h6 mb-0 navbar mt-3">
          <div>Your response has been sent successfully</div>
          <div>
            <button className="btn btn-success  rounded-circle btn-sm  mr-1">
              <i className="fa text-white fa-close"></i>
            </button>
          </div>
        </div>
      );
    }
  };
  componentDidMount() {
    axios
      .get(`/dash/message/${this.props.match.params.messageId}`)
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
    this.setState({ messageId: this.props.match.params.messageId });
  }

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
          document.getElementById("btnRep").innerHTML = "Reply";
          document.getElementById("btnRep").disabled = false;
        })
        .catch((err) => {
          console.log(err);
          document.getElementById("btnRep").innerHTML = "Retry";
          document.getElementById("btnRep").disabled = false;
        });
    } else {
      alert("Type a response first");
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section className="px-3">
        {this.alert()}
        <div className="bg-white mt-3 px-0 rounded navbar">
          <div>
            <h3 className="c-blue- mb-0 bold">Showing Message</h3>

            <div className="c-blue--">
              Showing message with ID : {this.state.messageId}
            </div>
            <h2 className="c-blue- mb-0 bold">RE : {this.state.data.head}</h2>
          </div>

          <div>
            <button className="btn btn-warning rounded-circle btn-lg ">
              <i className="fa text-white fa-star"></i>
            </button>
          </div>
        </div>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="card card-body ml-card-shadow bg-white rounded">
                <div>
                  <h4 className="c-blue- p-3 bg-blueish">Message</h4>
                  <div className="row mt-3">
                    <div className="col-lg-1">
                      <h6 className="c-blue-">Sender</h6>
                    </div>
                    <div className="col-lg-3">
                      <h6 className="text-secondary">
                        {" "}
                        : {this.state.data.sender}
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-1">
                      <h6 className="text-secondary">Sent By </h6>
                    </div>
                    <div className="col-lg-3">
                      <h6 className="text-secondary">
                        : {this.state.data.fullName}
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-1">
                      <h6 className="text-secondary">Sent </h6>
                    </div>
                    <div className="col-lg-3">
                      <h6 className="text-secondary">
                        : {dayjs(this.state.data.timeSent).format("L LT")}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="card-header px-0 bg-white">
                  <h5 className="c-blue p-3 bg-blueish">
                    RE : {this.state.data.head}
                  </h5>
                </div>
                <div className="mt-3 ">
                  <div className="c-blue-">
                    {" "}
                    <h6>- {this.state.data.message}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 pl-0 pl-lg-3">
              <div className="card card-body p-2 ml-card-shadow">
                <div className="p-3 bg-blueish mb-3">
                  <h5 className="c-blue- mb-0">Respond</h5>
                  <div className="c-blue-- ">
                    Your response will be sent to the sender email
                  </div>
                </div>

                <textarea
                  className="form-control "
                  placeholder="Your response.."
                  style={{ width: "100%", height: "100px" }}
                  id="response"
                ></textarea>

                <div className="mt-3">
                  <button
                    id="btnRep"
                    onClick={this.send}
                    className="btn btn-info px-5 "
                    style={{ float: "right" }}
                  >
                    {" "}
                    Reply <i className="fa fa-reply"></i>
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

export default Message;
