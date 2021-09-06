import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginSeller } from "../store/actions/sellerActions";
import icons from "../components/common/icons";
// import LockScreen from "./LockScreen";
// import LoadingItem from "../components/loadingItem/loadingItem";

const mapStateToProps = (state) => {
  return {
    loading: state.admin.loading,
    atnd: state.admin.authenticated,
    error: state.admin.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginSeller: (username, password) =>
      dispatch(loginSeller(username, password)),
  };
};

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const sellerLD = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginSeller(sellerLD, this.props.history);
  };

  // componentWillReceiveProps = () => {
  //     if ()
  // }
  errorM = () => {
    if (this.props.error) {
      return (
        <div className="border border-danger text-center mb-2 px-3 py-1 rounded text-danger">
          {this.props.error}
        </div>
      );
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value,
    });
  };

  modalItem = () => {};
  render() {
    if (this.props.atnd === true) {
      return <Redirect to="/" />;
    } else {
      document.title = "Admin login | Mallorar Mall Dashboard";
    }
    return (
      <div className="ml-login-page pt- position-fixed">
        <div className="card card-body pt-5 ml-whitish ml-log-in-form ml-center">
          <div className="login-logo ">
            <img className="img-fluid mb-0" alt="" src={icons.logo} />
            <h1 className="mb-3 h6 c-blue mt-2 bold">Store Dashboard</h1>
          </div>
          <div>{this.errorM()}</div>
          <form onSubmit={this.handleSubmit} autoComplete="OFF">
            <div className="form-group">
              <label className="c-blue- bol">Email address</label>
              <input
                type="email"
                className="form-control shadow-none"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group ">
              <label className="c-blue- ">Password</label>
              <input
                type="password"
                className="form-control shadow-none"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={this.props.loading ? true : false}
              className=" ml-dash-btn w-100 no-outline"
            >
              {this.props.loading ? "Please Wait.." : "Sign in"}
            </button>
          </form>
          <div className="mt-3 text-center c-blue-">
            &copy; Mallorar (Pty) Ltd
          </div>
        </div>
        {/* <div className="mt-3 text-center c-blue-">v2.5</div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
