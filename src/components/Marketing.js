import React, { Component } from "react";

class Marketing extends Component {
  render() {
    return (
      <section className="px-3">
        <div className="bg-white mt-3 p-4 rounded">
          <h4 className="text-secondary">Today's Marketing Stats</h4>
        </div>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-2">
              <div className="bg-white rounded ml-markrting-tile">
                <div className="ml-marketing-tile-title">User's Today</div>
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-2"></div>
            <div className="col-2"></div>
            <div className="col-2"></div>
            <div className="col-2"></div>
          </div>
        </div>
      </section>
    );
  }
}

export default Marketing;
