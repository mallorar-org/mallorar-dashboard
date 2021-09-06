import React, { Component } from "react";
import axios from "axios";
import Chip from "../common/Chip";
import MLSelect from "../MLSelect/MLSelect";
import countries from "../../util/countries";
import { connect } from "react-redux";
import {
  add_intl_shipping_zone,
  remove_shipping_zone,
} from "../../store/actions/productActions";
import { notify } from "../../components/MLNotify/controls";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add_intl_shipping_zone: (data) => dispatch(add_intl_shipping_zone(data)),
    remove_shipping_zone: (index) => dispatch(remove_shipping_zone(index)),
  };
};

class ZoneSelector extends Component {
  state = {
    countries: countries,
    selectedZone: "",
    shippingDuration: "",
    shippingCost: 0,
  };

  selectZone = () => {
    if (!this.state.selectedZone) {
      return notify(
        2,
        "Select Country",
        "",
        "You need to selected the a country for this shipping zone.",
      );
    }

    if (
      this.state.shippingCost <= 0 &&
      this.props.product.intl_shipping_type !== "flat"
    ) {
      return notify(
        2,
        "Invalid shipping cost",
        "",
        `International shipping costs cannot be ${this.props.product.base_currency} 0`,
      );
    }
    if (!this.state.shippingDuration) {
      return notify(
        2,
        "Invalid duration",
        "",
        "Set a shipping duration for this country",
      );
    }

    let zone_data = {
      index: null,
      country: this.state.selectedZone,
      shipping_duration: this.state.shippingDuration,
      cost: this.state.shippingCost,
    };

    this.props.add_intl_shipping_zone(zone_data);
    this.setState({
      selectedZone: "",
    });
  };

  returnCountryList = () => {
    let country_options = [];
    this.state.countries.forEach((x) => {
      country_options.push({
        label: x,
        value: x,
      });
    });
    return country_options;
  };

  render() {
    if (!this.props.modal_on) {
      return <div />;
    }

    console.log(this.state);
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
                    <MLSelect
                      use_prop_value={true}
                      value={
                        this.state.selectedZone && [
                          {
                            value: this.state.selectedZone,
                            label: this.state.selectedZone,
                          },
                        ]
                      }
                      isSearchable={true}
                      handleChange={(e) =>
                        this.setState({
                          selectedZone: e.value,
                        })
                      }
                      placeholder="Select country/zone"
                      options={this.returnCountryList()}
                    />
                  </div>
                </div>
              </div>
              {this.props.product.intl_shipping_type !== "flat" && (
                <>
                  <div className="row mt-3">
                    <div className="col-4 d-flex align-items-center">
                      <div className="c-blue-">
                        Shipping Cost ({this.props.product.base_currency})
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="c-blue- mt-0">
                        <input
                          onChange={(e) =>
                            this.setState({
                              shippingCost: parseFloat(e.target.value),
                            })
                          }
                          value={this.state.shippingCost}
                          className="form-control"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="row mt-3">
                <div className="col-4 d-flex align-items-center">
                  <div className="c-blue-">Delivery duration</div>
                </div>
                <div className="col-6">
                  <MLSelect
                    use_prop_value={true}
                    value={
                      this.state.shippingDuration && [
                        {
                          value: this.state.shippingDuration,
                          label: this.state.shippingDuration,
                        },
                      ]
                    }
                    handleChange={(e) =>
                      this.setState({
                        shippingDuration: e.value,
                      })
                    }
                    placeholder="Shipping duration"
                    options={[
                      {
                        value: "1-3 days",
                        label: "1-3 days",
                      },
                      {
                        value: "3-5 days",
                        label: "3-5 days",
                      },
                      {
                        value: "5-7 days",
                        label: "5-7 days",
                      },
                      {
                        value: "7-14 days",
                        label: "7-14 days",
                      },
                      {
                        value: "15-30 days",
                        label: "15-30 days",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-top ml-modal-shipping-zones-sec mt-3 pt-3">
            {this.props.product.intl_shipping_zones.map((x, index) => (
              <Chip
                index={index}
                key={x.index}
                x={x}
                remove={() => this.props.remove_shipping_zone(x.index)}
              />
            ))}
          </div>
          <div className="col-12 mt-0 border-top pt-3">
            <button onClick={this.selectZone} className="ml-dash-btn">
              Add Shipping Zone
            </button>
            <button onClick={this.props.close} className="ml-btn btn ml-3">
              Close
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ZoneSelector);
