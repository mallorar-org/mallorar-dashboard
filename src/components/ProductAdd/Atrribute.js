import React, { Component } from "react";
import Creatable from "../MLSelect/CreatableSelect";
import Multiselect from "../MLSelect/MultiSelect";

class Atrribute extends Component {
  state = {
    variablename: "",
    variable: "",
    variables: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let variable = {
      varibleName: this.state.variablename,
      variables: this.state.variables,
    };

    this.props.addvarr(variable);
  };

  handleVarChange = (e) => {
    let variables = e.target.value.replace(/ +/g, "").split(",");
    this.setState({
      variables: variables,
    });
  };
  handleVarNameChanged = (e) => {
    if (typeof e !== undefined) {
      this.setState({
        variablename: e.value,
      });
    }
  };

  handleMultiSelectChange = (n) => {
    let rawSelections = n;
    let prepared = [];

    rawSelections.forEach((x) => {
      prepared.push(x.value);
    });

    this.setState({
      variables: prepared,
    });

    console.log("multi select=>>", n);
  };
  render() {
    // console.log(this.state);
    return (
      <div className="card card-body px-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 px-0">
              <div className="d-flex w-100">
                <div class="input-group-prepend rounded-0">
                  <div class="input-group-text h6 mb-0 bold rounded-0">
                    &#43;
                  </div>
                </div>
                <div className="d-flex w-100">
                  <Creatable
                    handleChange={(n) => this.handleVarNameChanged(n)}
                    placeholder={"Variation Name"}
                  />
                </div>
              </div>
            </div>
            <div className="col-7">
              <Multiselect
                handleChange={(n) => this.handleMultiSelectChange(n)}
                placeholder={"Variation Options e.g (red, green)"}
              />
            </div>
            <div className="col-2 px-0">
              {this.state.variablename && this.state.variables.length > 1 ? (
                <button
                  onClick={this.handleSubmit}
                  class="btn ml-dash-btn  rounded-0 w-100 mb-2"
                >
                  Create
                </button>
              ) : (
                <button disabled class="btn rounded-0 w-100  ml-dash-btn mb-2">
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Atrribute;
