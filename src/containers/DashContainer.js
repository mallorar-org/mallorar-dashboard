import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import Loader from "../pages/loading";
import Routes from "../Routes";
import { getStore, setLoadingBarProgress } from "../store/actions/actions";
import { logOutSeller } from "../store/actions/sellerActions";
import { SET_AUTHENTICATED } from "../store/contructors";
import store from "../store/store";
import FinishSetUp from "../util/setup/FinishSetUp";
// import LoadingItem from "../components/loadingItem/loadingItem";
import MLNotify from "../components/MLNotify";
import MLProductCreated from "../components/Modals/MLProductCreated";
import MLProductDelModal from "../components/Modals/MLProductDelModal";
import DashLoading from "../pages/DashLoading";

// axios.defaults.baseURL = "https://api.mallorar.com";
axios.defaults.baseURL = "http://192.168.8.106:5000";
// axios.defaults.baseURL = "http://172.20.10.4:5000";

const token = localStorage.mdt;
if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common[`Authorization`] = token;
}

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
    // axios.get("/");
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
    let { navState, resize } = this.state;
    if (!this.props.dashready && this.props.atnd) {
      return (
        <DashLoading
          progress={this.props.progress}
          onLoadingFinished={() => store.dispatch(setLoadingBarProgress(0))}
        />
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
                {this.props.core.verified !== true ? (
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
