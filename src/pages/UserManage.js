import React, { Component } from "react";
// import axios from "axios";
import AllUsers from "../components/Users/AllUsers";
import { Link } from "react-router-dom";

class Users extends Component {
  state = {
    page: "",
  };

  componentDidMount = () => {
    let page = this.props.match.params.users;
    this.setState({
      page: page,
    });
  };

  renderComponent = () => {
    switch (this.state.page) {
      default:
        return <AllUsers />;
    }
  };
  render() {
    console.log(this.state);
    return (
      <section className="ml-container">
        <div className=" rounded d-flex justify-content-between">
          <div>
            <div>
              <Link className="a-cancel" to="/users">
                Users
              </Link>{" "}
              / new
            </div>
            <h2 className="c-blue mb-0 bold">Manage Users</h2>
            <div className="c-blue">
              Manage all your users and allow your team to log in to this store
            </div>
          </div>
          <div>
            <button
              disabled
              className="btn shadow-none ml-dash-btn rounded-0 px-4 py-2  cp"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="card card-body rounded-0 ml-shadow mt-3">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-lg-9 px-0">{this.renderComponent()}</div>
              <div className="col-lg-3 px-3 pr-lg-0">
                <div className="">
                  <Link to="/users">
                    {" "}
                    <button className="w-100 rounded-0 ml-dash-btn mb-2 ">
                      New User
                    </button>
                  </Link>
                  <Link to="/users/new">
                    {" "}
                    <button className="w-100 rounded-0 ml-dash-btn mb-2 ">
                      All Users
                    </button>
                  </Link>
                  {/* <button className="w-100 ml-dash-btn mb-2 ">
                    Administrators
                  </button>
                  <button className="w-100 ml-dash-btn mb-2 ">
                    Inactive
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Users;
