import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import icons from "./common/icons";

import { BiCategory } from "react-icons/bi";

const mapStateToProps = (state) => {
  return {
    stname: state.core.storeName,
    authLevel: state.admin.authLevel,
    // stname: "es",
  };
};

function Navigation({
  stname,
  resize,
  navState,
  metadata,
  logOutSeller,
  authLevel,
}) {
  const navOptions = [
    {
      title: "Messages",
      link: "/messages",
      icon: icons.solid.message.offWhite,
    },
    {
      title: "Products",
      link: "/products",
      icon: icons.solid.tag.offWhite,
    },
    {
      title: "Categories",
      link: "/categories",
      icon: null,
      svg_icon: <BiCategory className="" />,
      admin: true,
    },
    {
      title: "Storefront",
      link: "/store",
      icon: icons.solid.store.offWhite,
    },
    {
      title: "Orders",
      link: "/orders",
      icon: icons.solid.truck.offWhite,
    },
    {
      title: "Analytics",
      link: "/analyics",
      icon: icons.solid.analytics.offWhite,
    },
    {
      title: "Admin",
      link: "/admin",
      icon: icons.solid.boud.offWhite,
    },
    {
      title: "Users",
      link: "/users",
      icon: icons.solid.users.offWhite,
    },
    {
      title: "Settings",
      link: "/settings",
      icon: icons.solid.spunner.offWhite,
    },
  ];

  return (
    <aside
      style={{
        height: window.innerHeight,
      }}
      // className={`${
      //   resize
      //     ? navState
      //       ? "ml-sidebar_on-wnr"
      //       : "ml-sidebar__on-wnr"
      //     : navState
      //     ? "ml-sidebar_w"
      //     : "ml-sidebar_on-res"
      // } ml-sidebar`}
      className={`
   
      ml-sidebar_on-res
      ml-sidebar`}
    >
      <div className=" py-4 text-white">
        <Link to="/" className="d-flex a-cancel justify-content-center ">
          <img alt="" src={icons.logowhite} className="ml-logo img-fluid" />
        </Link>
      </div>
      <hr className="ml-nav-borders my-0 border-0" />
      <div className="text-white">
        <ul className="text-left ml-sidebar-container p-0 px-2 ">
          {metadata.claims ? (
            !(metadata.claims.verified === "true") ? (
              <Link
                className="ml-dash-options rounded p-2 my-3 d-flex align-items-center"
                to="/verify"
              >
                <div className="d-flex align-items-center">
                  <img src={icons.solid.message.offWhite} alt="" />
                  <span className="ml-2 ml-change">Verify Account</span>
                </div>
                <div className="text-right">
                  <img
                    src={icons.solid.arrow.white}
                    alt=""
                    className="ml-change"
                    style={{ width: "11px" }}
                  />
                </div>
              </Link>
            ) : (
              navOptions.map((opt, index) => {
                if (opt.admin && authLevel !== 6) return null;
                return (
                  <NavLink
                    key={index}
                    title={opt.title}
                    className="ml-dash-options rounded my-2 d-flex align-items-center"
                    to={opt.link}
                    activeClassName="ml-dash-options_a"
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      {opt.svg_icon ? (
                        opt.svg_icon
                      ) : (
                        <img src={opt.icon} alt="" />
                      )}

                      <span className="ml-2 mb-0 ml-change ml-sidebar-tt">
                        {opt.title}
                      </span>
                    </div>
                  </NavLink>
                );
              })
            )
          ) : undefined}
          <div
            onClick={logOutSeller}
            className="ml-dash-options rounded p-2 my-2 d-flex"
          >
            <div className="d-flex align-items-center">
              <img src={icons.solid.powerOff.offWhite} alt="" />
              <span className="ml-2 mb-0 ml-change ml-sidebar-tt">
                Sign Out
              </span>
            </div>
          </div>
        </ul>
      </div>
      <div className="ml-s-bar-footer position-absolute">
        <hr className="ml-nav-borders my-0 border-0" />
        <div className=" d-flex py-2  justify-content-center text-white ">
          <div className="bg- text-capitalize h4 mb-0 ml-t-n-u-n-f-t d-flex justify-content-center align-items-center rounded-circle text-white bold a-cancel">
            {stname.charAt(0)}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default connect(mapStateToProps, null)(Navigation);
