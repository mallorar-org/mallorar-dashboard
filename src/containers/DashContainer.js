import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../Routes";
import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import { connect } from "react-redux";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { SET_AUTHENTICATED } from "../store/contructors";
import { logOutSeller } from "../store/actions/sellerActions";
import store from "../store/store";
import { setLoadingBarProgress, getStore } from "../store/actions/actions";
import Loader from "../pages/loading";
import FinishSetUp from "../util/setup/FinishSetUp";
import icons from "../components/common/icons";
// import LoadingItem from "../components/loadingItem/loadingItem";
import BG from "../assets/images/780_987.png";
import MLNotify from "../components/MLNotify";
import MLProductCreated from "../components/Modals/MLProductCreated";
import MLProductDelModal from "../components/Modals/MLProductDelModal";

// axios.defaults.baseURL = "http://localhost:5000/mallorar/us-central1/apis";
axios.defaults.baseURL = "https://us-central1-mallorar.cloudfunctions.net/apis";
const token = localStorage.mdt;
if (token) {
  // const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  // store.dispatch(loadmeta(decodedToken));

  // if (decodedToken.exp * 1000 < Date.now()) {
  //   console.log("died");
  // }

  // else {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common[`Authorization`] = token;

  // store.dispatch(getSellerData())
  // }
}

// setInterval(() => {
//   const token = localStorage.mdt;
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     if (decodedToken.exp * 1000 < Date.now()) {
//       window.location.href = "/login";
//       store.dispatch(logOutSeller());
//     } else {
//       store.dispatch({ type: SET_AUTHENTICATED });
//       axios.defaults.headers.common[`Authorization`] = token;
//     }
//   }
// }, 1000);

// axios.defaults.baseURL = "https://us-central1-mallorar.cloudfunctions.net/api";

class DashBoardContainer extends Component {
  state = {
    href: "",
    navState: true,
    resize: false,
    resizeAu: false,
    ready: false,
  };

  componentDidMount() {
    if (this.props.atnd) {
      store.dispatch(getStore());
    }
    axios.get("/");
    this.setState({ href: window.location.pathname });
    window.addEventListener("resize", this.handleResize);
    return window.innerWidth <= 990
      ? this.setState({ resize: true, navState: true })
      : undefined;
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = () =>
    this.setState({
      resize: window.innerWidth <= 990 ? true : false,
      navState: true,
    });

  handleNav = () => this.setState({ navState: !this.state.navState });

  render() {
    window.document.title = "Seller Dashboard | Mallorar Online Mall";
    let { navState, resize } = this.state;

    // console.log(this.props.progress);

    if (!this.props.dashready && this.props.atnd) {
      return (
        <>
          <LoadingBar
            loaderSpeed={1200}
            className="ml-top-progress"
            progress={this.props.progress}
            onLoaderFinished={() => store.dispatch(setLoadingBarProgress(0))}
          />
          <div
            style={{ background: `url(${BG})` }}
            className="ml-bg-pic h-100 text-center w-100 d-flex align-items-center justify-content-center position-absolute"
          >
            <div className="text-center">
              <div className=" justify-content-center">
                <div className="d-flex  justify-content-center">
                  <img
                    src={icons.dashboardLogo}
                    className="img-fluid ml-logo-o-l-scrin"
                    alt=""
                  />
                </div>
              </div>
              <div className="h5 mt-3 bold">
                <div className="ml-loading-container-1">
                  <div
                    style={{ width: `${this.props.progress}%` }}
                    className="ml-loading-bar-2"
                  ></div>
                </div>
                {/* <div className="mt-3 h4 c-blue- "></div> */}
              </div>
            </div>
            <div style={{ bottom: 20 }} className="position-absolute">
              <div className="d-flex  position-relative justify-content-between">
                <div>Mallorar Seller Dashboard v2.2.5 </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <React.Fragment>
        <Router>
          <LoadingBar
            loaderSpeed={1200}
            className="ml-top-progress"
            progress={this.props.progress}
            onLoaderFinished={() => store.dispatch(setLoadingBarProgress(0))}
          />

          {this.props.atnd ? (
            <SideBar
              navState={navState}
              handleNav={this.handleNav}
              logOutSeller={this.props.logOutSeller}
              metadata={this.props.metadata}
            />
          ) : (
            ""
          )}

          <main
            className={`
            
            
            ml-main_on-res
            //   resize
            //     ? navState
            //       ? "ml-main_on-wnr"
            //       : "ml-main__on-wnr"
            //     : navState
            //     ? "ml-main_w"
            //     : "ml-main_on-res"  
            //   }

               ${this.props.atnd ? " ml-main" : ""}
              
              
              `}
          >
            {this.props.dashoverlay && (
              <div className={"ml-dash-overlay"}>
                <div className=" mt-5 ml-loading-das-m-eseam">
                  <Loader loader="3" />
                </div>
              </div>
            )}
            <MLNotify />
            <MLProductCreated />
            <MLProductDelModal />

            {this.props.atnd ? (
              <Navigation
                navState={navState}
                title={this.props.title}
                resize={resize}
                handleNav={this.handleNav}
              />
            ) : undefined}
            {/* <Routes /> */}

            {this.props.core ? (
              <div>
                {this.props.core.verified !== "true" ? (
                  <FinishSetUp />
                ) : (
                  <>
                    {/* <WarningArea /> */}
                    <Routes />
                  </>
                )}
              </div>
            ) : (
              <Routes />
            )}
          </main>
        </Router>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  logOutSeller,
};
const mapStateToProps = ({ navTitles, admin, core, progress }) => ({
  title: navTitles.title,
  atnd: admin.authenticated,
  metadata: admin.meta,
  core: core,
  dashoverlay: progress.dashOverLay,
  dashready: progress.dashready,
  progress: progress.progress,
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardContainer);
