import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        authenticated: state.admin.authenticated
    }
}
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) => authenticated === true ? <Component {...props} /> : <Redirect to="/login" />}
    />
)

export default connect(mapStateToProps, null)(AuthRoute);
