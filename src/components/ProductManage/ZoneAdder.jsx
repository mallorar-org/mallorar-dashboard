import React, { Component } from "react";
import axios from "axios";
import countries from "../../util/countries";

class ZoneSelector extends Component {
  state = {
    countries: countries,
  };

  selectZone = () => {
    let country = document.getElementById("selectCountry").value;
    let Scost = document.getElementById("Scost").value;

    document.getElementById("btnselectCountry").innerHTML = "Adding..";

    axios
      .post("/dash/addzone", {
        country: country,
        cost: Scost,
      })
      .then(() => {
        this.props.reload();
        this.props.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (!this.props.modal_on) {
      return <div />;
    }

    return (
      <div className="modal pt-5">
        <div className="border  col-6 card-body modal-content">
          <div className="navbar bg-blueish rounded">
            <div>
              <h5 className="bold mb-0 ">Add Shipping Zones</h5>
              <div className="c-blue-- mb-0 ">
                Consider shipping zones as countries
              </div>
            </div>
            <div>
              <button
                onClick={this.props.close}
                className="btn shadow-none btn-light bold rounded-circle btn-lg"
              >
                X
              </button>
            </div>
          </div>
          <div>
            <div className="container-fluid px-0 mt-4">
              {" "}
              <div className="row">
                <div className="col-4 d-flex align-items-center">
                  <div className="c-blue-">Country/Zone</div>
                </div>
                <div className="col-6">
                  <div className="c-blue-">
                    <select
                      id="selectCountry"
                      defaultValue={"United States"}
                      className="form-control mt-2"
                    >
                      {this.state.countries.map((x, index) => (
                        <option value={x} key={index}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 d-flex align-items-center">
                  <div className="c-blue-">Shipping Cost ($US)</div>
                </div>
                <div className="col-6">
                  <div className="c-blue- mt-0">
                    <input
                      defaultValue="0.00"
                      className="form-control"
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 d-flex align-items-center">
                  <div className="c-blue-">Delivery duration</div>
                </div>
                <div className="col-6">
                  <select className="form-control">
                    <option value="1-3 days">1-3 days</option>
                    <option value="3-5 days">3-5 days</option>
                    <option value="5-7 days">5-7 days</option>
                    <option value="7-14 days">7-14 days</option>
                    <option value="15-30 days">15-30 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="border-top mt-3 pt-3">es</div>
          <div className="col-12 mt-3 border-top pt-3">
            <button onClick={this.selectZone} className="ml-dash-btn">
              Add Shipping Zone
            </button>
            <button className="ml-btn btn ml-3">Cancel</button>
          </div>
          <div className="text-secondary p-3">
            By adding this shipping zone, all customers in this zone (country)
            will be billed with this additional shipping fee
          </div>
        </div>
      </div>
    );
  }
}

export default ZoneSelector;
