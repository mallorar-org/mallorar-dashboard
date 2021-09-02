import React, { Component } from "react";
import ROption from "./ROption";

class RegionSelector extends Component {
  state = {
    selected: [],
    zones: [],
    countries: [
      {
        name: "United States",
        regions: [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
        ],
      },
    ],
  };

  componentDidMount = () => {
    let selectedZone = this.props.selectedZone;
    let regions = [];

    this.state.countries.forEach((x) => {
      if (x.name === selectedZone) {
        return (regions = x.regions);
      }
    });

    this.setState({
      zones: regions,
    });
  };

  selected = (n) => {
    let selected = this.state.selected;
    selected.forEach(x => {
      if (n === x) {
        return selected.push(x)
      }
    })

    this.setState({
      selected: selected
    })
  }

  render() {
    console.log(this.state.selected)
    return (
      <div className="modal pt-5">
        <div className="border card-body modal-content">
          <div className="navbar bg-blueish rounded">
            <div>
              <h5 className="c-blue- mb-0 p-3 ">
                Shipping Regions
                <div className="c-blue-- mb-0 h6 ">
                  Select shipping regions for {this.props.selectedZone}
                </div>
              </h5>
            </div>
            <div>
              <button onClick={this.props.close} className="btn shadow-none btn-light bold rounded-circle btn-lg"
              >&times;</button>
            </div>
          </div>
          <div>
            <div>
              {this.state.selected.map((x, index) => (
                <span key={index}>{x}</span>
              ))}
            </div>

            <div className="container-fluid mt-3">
              <div className="row">
                {this.state.zones.map((x, index) => (
                  <div className="col-lg-3 col-md-4">
                    <ROption selected={(n) => this.selected(n)} region={x} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegionSelector;
