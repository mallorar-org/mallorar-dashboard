import React, { Component } from "react";
import { connect } from "react-redux";
// import MessagesList from "../components/MessagesList/MessagesList";
// import { MDBTabPane, MDBTabContent } from "mdbreact";
// import axios from "axios";
// import Loader from "./loading";
import { navTitle } from "../store/actions/navTitles";
import axios from "axios";
import Loading from "../pages/loading";
import Message from "../components/MessagesList/Message";
import MessageItem from "../components/MessagesList/MessageLitem";
import { Link } from "react-router-dom";

class Messages extends Component {
  state = {
    loading: true,
    activeItem: "1",
    messageTabs: [
      {
        title: "All Messages",
        i: 1,
      },
      // {
      //   title: "Uread",
      //   i: 2,
      // },
      // {
      //   title: "Read",
      //   i: 3,
      // },
      // {
      //   title: "Resolved",
      //   i: 4,
      // },
      // {
      //   title: "Deleted",
      //   i: 5,
      // },
    ],
    newArrayTabs: [],
    activeTab: "All Messages",
    messages: [],
    selected: "",
  };

  setMessage = (n) => {
    this.setState({
      selected: n,
    });
  };

  renderMessage = () => {
    let message = {};
    this.state.messages.forEach((x) => {
      if (x.messageID === this.state.selected) {
        message = x;
      }
    });

    return message;
  };

  componentDidMount = () => {
    this.props.navTitle("Messages");
    axios
      .get("/dash/messages")
      .then((res) => {
        console.log(res.data);
        this.setState({
          messages: res.data,
          selected: res.data[0].messageID,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  };

  componentWillUnmount() {
    this.props.navTitle("");
  }

  renderComponent = () => {
    return (
      <div className="w-100 h-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <div>
                <h1 className="c-blue bold">
                  Grow your <br /> customer base with Mallorar
                </h1>
                <p className="mt-3">
                  At the moment you have no active conversations. All your
                  emails or conversations will appear here and you'll be able to
                  contact customers as well as respond to emails.
                </p>
              </div>
              <div className="mt-5">
                <Link
                  to="/store/followers"
                  className="btn ml-dash-btn p-3 bold px-5"
                >
                  See followers
                </Link>
              </div>
            </div>
            <div className="col-6 position-relative">
              {/* <div style={{ bottom: "0" }} className="position-absolute">
                <img className="img-flui" src={BG} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  activeTab = (e) => {
    let arr = this.state.messageTabs.filter((tab) => {
      return tab.i !== e.target.getAttribute("data-active");
    });
    console.log(arr, e.target.getAttribute("data-active"));

    this.setState({
      messageTabs: arr,
      activeTab: e.target.getAttribute("msgtitle"),
    });
  };
  SliceTextTitle = (title) =>
    title.length > 100 ? `${title.slice(0, 100)}...` : title;

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    console.log(this.state);

    if (this.state.messages.length === 0) {
      return (
        <div>
          <div className="ml-customer-conversations-wrapper position-fixed">
            <div>
              <div className="empty-visitors text-center">
                <div className="mb-3">No messages as yet.</div>
                <button className="ml-btn p-1 px-2">Refresh</button>
              </div>
            </div>
          </div>
          <div
            style={{ height: window.innerHeight - 100 }}
            className="ml-messaging-content-wrapper d-flex ml-container"
          >
            {this.renderComponent()}
          </div>
        </div>
      );
    }

    return (
      <section className="container-fluid px-lg-3 ml-messages">
        <div className="border-right border-bottom px-0  ml-message-board">
          <div className="row px-0">
            <div className="bg-white col-12 col-md-4 pt-2 px-0 border-right ">
              <div className="ml-middle-panel overflow-auto">
                <div className="mx-auto overflow-scroll">
                  <div className="py-2 px-2 shadow ml-top-nav bg-white position-sticky">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="c-blue h4 mb-0 bold">Messages</span>
                        <div className="d-inline-block ml-2 text-primary ml-background px-2 badge-light rounded-pill">
                          {this.state.messages.length}
                        </div>
                      </div>
                      <div>
                        {/* <button className="" data-role="btn-icon">
                          +
                        </button> */}
                      </div>
                    </div>
                    <div className="mt-3">
                      {/* <Dropdown
                        array={this.state.messageTabs}
                        active={this.state.activeTab}
                      >
                        {this.state.messageTabs.map((msgTab, i) => (
                          <div
                            className="ml-item"
                            key={i}
                            onClick={this.activeTab}
                            data-active={msgTab.i}
                            msgtitle={msgTab.title}
                          >
                            {msgTab.title}
                          </div>
                        ))}
                      </Dropdown> */}
                      <div className="form-control"> All Messages</div>
                    </div>
                  </div>

                  {this.state.messages.map((x, index) => (
                    <MessageItem
                      active={
                        this.state.selected === x.messageID ? true : false
                      }
                      setMessage={(n) => this.setMessage(n)}
                      x={x}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div
              className="col-12 col-md-8 py-3 px-lg-4 
              pt-3 position-relative "
            >
              <div className="ml-right-panel">
                <div className="d-flex px-lg-3 flex-wrap ml-vendor-info align-items-center">
                  <Message data={this.renderMessage()} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
