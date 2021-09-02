import React, { Component } from "react";

class SubNav extends Component {
  render() {
    return (
      <section className="ml-subnav-fix">
        <div className="position-fixed ml-subnav text-white d-flex justify-content-between align-items-center px-3">
          <ul className="p-0 m-0">
            <li className="fa fa-bars"></li>
          </ul>
          <ul className="p-0 m-0">
            <li className="fa fa-envelope mr-4"></li>
            <li className="fa fa-bell mr-4"></li>
          </ul>
        </div>
      </section>
    );
  }
}

export default SubNav;
