import axios from "axios";
import React, { Component } from "react";

class ZoneSelector extends Component {
  state = {
    countries: [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua & Deps",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Central African Rep",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "East Timor",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Ivory Coast",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea North",
      "Korea South",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "St Kitts & Nevis",
      "St Lucia",
      "Saint Vincent & the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome & Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Togo",
      "Tonga",
      "Trinidad & Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Vatican City",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ],
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
    return (
      <div className="modal pt-5">
        <div className="border card-body modal-content">
          <div className="navbar bg-blueish rounded">
            <div>
              <h5 className="c-blue- mb-0 ">Add a Shipping Zone</h5>
              <div className="c-blue-- mb-0 ">
                We currently consider shipping zones as countries
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
            <div className="container-fluid mt-4">
              {" "}
              <div className="row">
                <div className="col-6 pr-2">
                  <div className="c-blue-">Country/Zone</div>
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
                <div className="col-6 pr-2">
                  <div className="c-blue-">Shipping Cost ($US)</div>
                  <div className="c-blue- mt-2">
                    <input
                      id="Scost"
                      defaultValue="0.00"
                      className="form-control"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 text-center mt-3">
            <button
              id="btnselectCountry"
              onClick={this.selectZone}
              className="ml-dash-btn"
            >
              Add Shipping Zone
            </button>
          </div>
          <div className="c-blue c-blue- text-center p-3">
            By adding this shipping zone, all customers in this zone (country)
            will be billed with this shipping fee
          </div>
        </div>
      </div>
    );
  }
}

export default ZoneSelector;
