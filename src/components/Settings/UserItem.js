import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/loadingItem/loadingItem";

const mapStateToProps = (state) => {
  return {
    meta: state.admin.meta,
  };
};

class UserItem extends Component {
  state = {
    edit: false,
    loading: true,
  };

  updateDetails = () => {};

  handleSubmit = (e) => {
    e.preventDefault();
    let sellerPassword = document.getElementById("sellerPassword").value;
    let sellerName = document.getElementById("sellerName").value;
    let sellerSurname = document.getElementById("sellerSurname").value;
    let sellerEmail = document.getElementById("sellerEmail").value;
    document.getElementById("btnUpdateUSer").innerHTML = "Updating";

    axios
      .post(`/dash/user/edit/${sellerEmail}`, {
        sellerPassword: sellerPassword,
        sellerName: sellerName,
        sellerSurname: sellerSurname,
      })
      .then(() => {
        this.reload();
        document.getElementById("btnUpdateUSer").innerHTML = "Change Details";
        this.setState({
          message: "Profile Updated",
          edit: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  edit = () => {
    return (
      <div className="c-blue-">
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <label className="">Name</label>{" "}
            </div>
            <input
              id="sellerName"
              required
              defaultValue={this.state.data.sellerName}
              className="form-control"
              style={{ width: "100%" }}
              type="text"
            />
          </div>
          <div>
            <div>
              <label className="mt-2"> Surname</label>{" "}
            </div>
            <input
              id="sellerSurname"
              required
              defaultValue={this.state.data.sellerSurname}
              className="form-control"
              style={{ width: "100%" }}
              type="text"
            />
          </div>
          <div>
            <div>
              <label className="mt-2 text-secondary"> Email</label>{" "}
            </div>
            <input
              id="sellerEmail"
              readOnly
              defaultValue={this.state.data.sellerEmail}
              className="form-control"
              style={{ width: "100%" }}
              type="text"
            />
          </div>
          <div>
            <div>
              <label className="mt-2 text-secondary"> Password</label>{" "}
            </div>
            <input
              id="sellerPassword"
              required
              defaultValue={this.state.data.sellerPassword}
              className="form-control"
              style={{ width: "100%" }}
              type="text"
            />
          </div>
          <div className=" text-center mt-3">
            <button
              type="submit"
              id="btnUpdateUSer"
              className="ml-dash-btn w-100 no-outline"
            >
              Update Details
            </button>
          </div>
        </form>
      </div>
    );
  };

  View = () => {
    return (
      <div className="c-blue- text-center mt-3">
        <div>
          <div className="bold">Name</div>
          <div> - {this.state.data.sellerName}</div>
        </div>
        <div>
          <div className="mt-1 bold"> Surname</div>
          <div> - {this.state.data.sellerSurname}</div>
        </div>
        <div>
          <div className="mt-1 bold"> Email</div>{" "}
          <div> - {this.state.data.sellerEmail}</div>
        </div>
        <div>
          <div className="mt-1 text-secondary bold"> Verified : Yes</div>
        </div>
        <div className=" text-center mt-3">
          <button
            onClick={() => this.setState({ edit: true })}
            type="button"
            className="ml-dash-btn w-100 no-outline"
          >
            Change Details
          </button>
        </div>
      </div>
    );
  };

  renderComponent = () => {
    switch (this.state.edit) {
      case true:
        return this.edit();
      case false:
        return this.View();
      default:
        return this.View();
    }
  };

  reload = () => {
    axios
      .get(`/dash/user/getdata/${this.props.meta.uid}`)
      .then((data) => {
        console.log(data.data);
        this.setState({
          data: data.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    this.reload();
  };
  render() {
    if (this.state.loading) {
      return (
        <div className=" mt-3 card ml-card-shadow  card-body">
          <div className="bg-white px-2 mb-5 text-center text-secondary">
            <h5 className="mb-0 c-blue- bold ">My Profile</h5>
            <div className="mb-0 c-blue-">Loading Profile..</div>
          </div>
          <div className="mt-5">
            <div className="mt-5 pt-5">
              <Loading className="p-0" loader={"2"} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className=" mt-3 card ml-card-shadow  card-body">
        <div className="bg-white px-2  text-center text-secondary">
          <h5 className="mb-0 c-blue- bold ">My Profile</h5>
          <div className="mb-0 c-blue-">Update your profile anytime</div>
        </div>
        <div>{this.renderComponent()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(UserItem);
