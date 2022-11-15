import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//DashBoard Pages

import Products from "./pages/Products";
import ProductManage from "./pages/ProductManage";
import Orders from "./pages/Orders";
import OrderManage from "./pages/OrderManage";

import ShopSettings from "./pages/ShopSettings.js";
import StoreAdmin from "./pages/Store.js";
import LogIn from "./pages/LogIn";
import Messages from "./pages/Messages.js";
import Message from "./pages/Message.js";
// import PageNotFound from "./pages/PageNotFound";
import StoreControls from "./pages/StoreControls";
import AuthRoute from "./util/AuthRoutes";
import Verify from "./pages/Verify";
import Users from "./pages/Users";
import UserManage from "./pages/UserManage";
import HomePage from "./pages/Homepage";
import Analytics from "./pages/Analytics";
import CategoriesHome from "./pages/CategoriesHome";

const mapStateToProps = (state) => {
  return {
    meta: state.admin.meta,
  };
};

class Router extends React.Component {
  notVerified = () => {
    if (!(this.props.meta.claims.verified === "true")) {
      return (
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <AuthRoute exact path="/" component={Verify} />
          <AuthRoute exact path="/verify" component={Verify} />

          <Route
            render={function () {
              return <Redirect to="login" />;
            }}
          />
        </Switch>
      );
    }
  };

  render() {
    if (this.props.meta.claims) {
      if (!(this.props.meta.claims.verified === "true")) {
        return (
          <Switch>
            <Route exact path="/login" component={LogIn} />
            <AuthRoute exact path="/" component={Verify} />
            <AuthRoute exact path="/verify" component={Verify} />

            <Route
              render={function () {
                return <Redirect to="login" />;
              }}
            />
          </Switch>
        );
      }
    }

    return (
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <AuthRoute exact path="/" component={HomePage} />
        <AuthRoute exact path="/messages" component={Messages} />
        <AuthRoute exact path="/message/:messageId" component={Message} />
        <AuthRoute exact path="/store/:page" component={StoreControls} />
        <AuthRoute exact path="/analytics/:page" component={Analytics} />
        <AuthRoute exact path="/categories" component={CategoriesHome} />

        <Route
          exact
          path="/store"
          render={function () {
            return <Redirect to="/store/general" />;
          }}
        />
        <Route
          exact
          path="/analyics"
          render={function () {
            return <Redirect to="/analytics/revenue" />;
          }}
        />
        <AuthRoute exact path="/products" component={Products} />
        <AuthRoute exact path="/products/:page" component={ProductManage} />
        <Route
          exact
          path="/product/add"
          render={function () {
            return <Redirect to="/products/add" />;
          }}
        />
        {/* <AuthRoute exact path="/product/:productdId" component={ProductEdit} /> */}
        <AuthRoute exact path="/orders" component={Orders} />
        <AuthRoute exact path="/order/:OrderId" component={OrderManage} />
        <AuthRoute exact path="/settings/:page" component={ShopSettings} />
        <Route
          exact
          path="/settings"
          render={function () {
            return <Redirect to="/settings/general" />;
          }}
        />

        <Route
          exact
          path="/admin"
          render={function () {
            return <Redirect to="/admin/store" />;
          }}
        />

        <AuthRoute exact path="/admin/:page" component={StoreAdmin} />
        <AuthRoute exact path="/verify" component={Verify} />
        <AuthRoute exact path="/users" component={Users} />
        <AuthRoute exact path="/users/:users" component={UserManage} />

        <Route
          render={function () {
            return <Redirect to="login" />;
          }}
        />
      </Switch>
    );
  }
}

export default connect(mapStateToProps, null)(Router);
