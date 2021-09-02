import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { navTitle } from "../store/actions/navTitles";

class Users extends Component {
  state = {
    name: "",
    authLevel: "",
    surname: "",
    email: "",
    error: "",
    password: "",
  };

  componentDidMount() {
    this.props.navTitle("Manage User");
  }
  componentWillUnmount() {
    this.props.navTitle("");
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    document.getElementById("idAuthlevelerr").innerHTML = "";
    e.preventDefault();
    if (document.getElementById("authLevel").value === "na") {
      return (document.getElementById("idAuthlevelerr").innerHTML =
        "Please assign an Auth Level");
    }

    document.getElementById("btnNEwuser").innerHTML = "Adding..";
    document.getElementById("btnNEwuser").disabled = true;

    axios
      .post("/dash/adduser", this.state)
      .then(() => {
        document.getElementById("btnNEwuser").innerHTML = "Add User";
        document.getElementById("btnNEwuser").disabled = false;
        window.location.href = "/users/users";
      })
      .catch((err) => {
        if (err.response.data.error) {
          this.setState({
            error: err.response.data.error,
          });
        }
        document.getElementById("btnNEwuser").innerHTML = "Add User";
        document.getElementById("btnNEwuser").disabled = false;
      });
  };

  renderRolelist = () => {
    switch (this.state.authLevel) {
      case "4":
        return (
          <ul>
            <li>Add/Edit Products</li>
            <li>Read/Respond to Emails</li>
            <li>Manage Orders</li>
            <li>Manage Shop Appearance</li>
            <li>Manage settings</li>
          </ul>
        );
      case "3":
        return (
          <ul>
            <li>Add/Edit Products</li>
            <li>Read/Respond to Emails</li>
            <li>Manage Orders</li>
          </ul>
        );
      case "2":
        return (
          <ul>
            <li>Read/Respond to Emails</li>
            <li>Manage Orders</li>
          </ul>
        );
      case "1":
        return (
          <ul>
            <li>Only Read/Respond to Emails</li>
          </ul>
        );

      default:
        return (
          <ul>
            <li>Select Auth Level</li>
          </ul>
        );
    }
  };

  renderComponent = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <div className="p-2 mb-2 bg-blueish rounded mb-2">
          <div className="navbar">
            <div className="">
              <div className="h4 mb-0 c-blue-">Add User</div>
              <div className=" mb-0 c-blue-">
                <strong> Please Note :</strong> The users email must not be active
              in any other store to make a successful add
              </div>
            </div>
          </div>
        </div> */}
        <div
          className={
            this.state.error ? " mt-3 alert alert-warning navbar" : "d-none"
          }
        >
          <div>
            <strong>Error#23 :</strong> You just tried to add an active seller
            email that already exists in your store or another store
          </div>
          <div>
            <button
              type="button"
              onClick={() => this.setState({ error: "" })}
              className="btn shadow-none btn-warning rounded-circle"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="row pt-2">
          <div className="col-lg-6 pr-3 ">
            <div className="c-blue- mb-1">Name</div>
            <div className="c-blue-">
              <input
                required
                className="form-control"
                name="name"
                onChange={this.handleChange}
                type="text"
                placeholder="e.g Stanley"
              />
            </div>
          </div>
          <div className="col-lg-6 pr-3">
            <div className="c-blue- mb-1">Surname</div>
            <div className="c-blue-">
              <input
                required
                className="form-control"
                name="surname"
                onChange={this.handleChange}
                type="text"
                placeholder="e.g Wells"
              />
            </div>
          </div>
        </div>
        <div className="row pt-2 mt-2">
          <div className="col-lg-6 pr-3 ">
            <div className="c-blue- mb-1">User Email</div>
            <div className="c-blue-">
              <input
                className="form-control"
                name="email"
                required
                onChange={this.handleChange}
                type="email"
                placeholder="e.g stanleywells@gmail.com"
              />
            </div>
          </div>
          <div className="col-lg-6 pr-3">
            <div className="c-blue- mb-1">
              Set Password (user can change it later)
            </div>
            <div className="c-blue-">
              <input
                className="form-control"
                name="password"
                required
                onChange={this.handleChange}
                type="password"
                placeholder="e.g Password"
              />
            </div>
          </div>
        </div>
        <div className="row pt-2 mt-2">
          <div className="col-lg-12 mb-3 ">
            <div className="p-2 mb-2 bg-blueish rounded mb-2">
              <div className="navbar">
                <div className="">
                  <div className="h4 mb-0 c-blue-">User Roles</div>
                  <div className=" mb-0 c-blue-">
                    Assign an authentication level to this user
                  </div>
                </div>
                <div className=""> </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 pr-3 ">
            <div className="c-blue- mb-1">User Role</div>
            <div className="c-blue-">
              <select
                className="form-control c-blue-"
                name="authLevel"
                required
                id="authLevel"
                onChange={this.handleChange}
              >
                <option value="na">Select Auth Level</option>
                <option value="4">Auth Level 4</option>
                <option value="3">Auth Level 3</option>
                <option value="2">Auth Level 2</option>
                <option value="1">Auth Level 1</option>
              </select>
            </div>
            <div id="idAuthlevelerr" className="text-danger bold"></div>
          </div>
          <div className="col-lg-6">
            <div className="c-blue- bg-blueish p-2">
              <div className="c-blue- bold">Role Preview</div>
              {this.renderRolelist()}
            </div>
          </div>
        </div>
        <div className=" pt-2 mt-2">
          <div className="c-blue-">
            The user will be promted to verify their email upon first login
          </div>
          <div className="float-right">
            <button id="btnNEwuser" className="ml-dash-btn rounded-0">
              Add User
            </button>
          </div>
        </div>
      </form>
    );
  };
  render() {
    return (
      <div className="ml-container bg-whit">
        <div className="d-flex justify-content-between">
          <div>
            <div>Users /</div>
            <h2 className="c-blue mb-0 bold">Manage Users</h2>
            <div className="">
              Manage all your users and allow your team to log in to this store
            </div>
          </div>
          <div>
            <button disabled className="ml-dash-btn rounded-0 cursor">
              Reset
            </button>
          </div>
        </div>
        <div className="card card-body rounded-0 ml-shadow my-3">
          <div className="row">
            <div className="col-lg-9">{this.renderComponent()}</div>
            <div className="col-lg-3">
              <div className="">
                <Link to="/users">
                  {" "}
                  <button className="w-100 ml-dash-btn rounded-0 mb-2 ">
                    New User
                  </button>
                </Link>
                <Link to="/users/new">
                  {" "}
                  <button className="w-100 ml-dash-btn rounded-0 mb-2 ">
                    All Users
                  </button>
                </Link>
                {/* <Link to="">  <button className="w-100 ml-dash-btn mb-2 ">
                    Administrators
                  </button></Link>
                <Link to="">  <button className="w-100 ml-dash-btn mb-2 ">
                    Inactive
                  </button></Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  navTitle,
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
