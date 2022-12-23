import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import icons from "../components/common/icons";
import { loginSeller } from "../store/actions/sellerActions";
import Logo from "../assets/images/logos/logo512.png";
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
    }
    return (
      <div className="ml-login-page pt- position-fixed">
        <div className="card card-body border pt-5 ml-whitish ml-log-in-form ml-center">
          <div className="login-logo ">
            <img className="img-fluid mb-0" alt="" src={Logo} />
            <h1 className="mb-3 h6 c-blue mt-2 bold">
              Sign in to Seller Centre
            </h1>
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
            <div className="mt-4">
              <button
                type="submit"
                disabled={this.props.loading ? true : false}
                className="ml-dash-btn w-100 no-outline"
              >
                {this.props.loading ? "Please Wait.." : "Sign in"}
              </button>
            </div>
            <div className="pt-2 text-center border-top mt-4">
              <span className="mr-1 text-dark">Not a seller yet ?</span>
              <a href="https://create.mallorar.com">Create an account</a>
            </div>
          </form>
          <div className="mt-3 text-center c-blue-">
            &copy; Martlyy (Pty) Ltd
          </div>
        </div>
        {/* <div className="mt-3 text-center c-blue-">v2.5</div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
