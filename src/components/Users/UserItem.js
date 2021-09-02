import React, { Component } from "react";
import axios from "axios";

class UserItem extends Component {
  state = {
    active: "",
  };

  deleteUser = () => {
    document.getElementById(this.props.id).innerHTML = "Deleting..";
    axios.get(`/dash/userdel/${this.props.x.sellerEmail}`).then(() => {
      this.props.reload();
    });
  };
  componentDidMount = () => {
    this.setState({
      active: this.props.x.active,
    });
  };

  activeChange = () => {
    if (this.state.active === "true") {
      this.setState({
        active: "false",
      });
    }
    if (this.state.active === "false") {
      this.setState({
        active: "true",
      });
    }
  };
  render() {
    return (
      <div className="d-flex ml-table-row border-bottom align-items-center">
        <div className="col-3">
          {this.props.x.sellerName + " " + this.props.x.sellerSurname}
        </div>
        <div className="col-3">
          <div>
            {" "}
            <div className="">{this.props.x.sellerEmail}</div>
            {/* <div className="float-left">Delete</div> */}
          </div>
        </div>
        <div className="col-3 pt-2 pb-1">
          {this.props.x.authLevel === "5" ? (
            <div>
              <div className="">
                {" "}
                <label className="op-50 ml-switch mb-0">
                  <input
                    className=""
                    disabled
                    checked={"checked"}
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="">
                <strong className="bold">Delete</strong> | Edit
              </div>
            </div>
          ) : (
            <div>
              <div className="">
                {" "}
                <label className="ml-switch mb-0">
                  <input
                    // onChange={this.activeChange}
                    checked={this.state.active === "true" ? "checked" : ""}
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="">
                <strong
                  onClick={this.deleteUser}
                  id={this.props.id}
                  className="bold r-o-h"
                >
                  Delete
                </strong>{" "}
                | Edit
              </div>
            </div>
          )}
        </div>
        <div className="col-3">
          <div>Level {this.props.x.authLevel}</div>{" "}
          <div>
            {this.props.x.authLevel === "5" ? (
              <span className="bold">Administrator</span>
            ) : (
              ""
            )}
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default UserItem;
