import React, { Component } from "react";

class Atrribute extends Component {
  state = {
    variablename: "",
    variable: "",
    variables: [],
  };

  renderList = () => {
    if (this.state.variablename) {
      return (
        <div className="d-flex">
          <div className="ml-varibleName-lst-name">
            {this.state.variablename}
          </div>

          {this.state.variables.map((x, index) => {
            return (
              <div key={index} className="ml-varibleName-lst">
                {x}
              </div>
            );
          })}
        </div>
      );
    }
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
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "variable") {
      this.preparelst();
    }
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "variable") {
      this.preparelst();
    }
  };
  render() {
    // console.log(this.state);
    return (
      <div className="card card-body">
        <form onSubmit={this.handleSubmit} class="form-inline">
          <label class="sr-only" for="inlineFormInputGroupUsername2">
            V Name
          </label>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">&#8853;</div>
            </div>
            <input
              type="text"
              onChange={this.handleChange}
              class="form-control"
              name="variablename"
              placeholder="Variable Name"
            />
          </div>
          <label class="sr-only" for="inlineFormInputName2">
            -
          </label>
          <input
            type="text"
            onChange={this.handleVarChange}
            name="variable"
            class="form-control mb-2 mr-sm-2"
            placeholder="Variables, seperate by comma (,)"
          />

          <button type="submit" class="btn ml-dash-btn mb-2">
            Append
          </button>
        </form>
        {this.renderList()}
      </div>
    );
  }
}

export default Atrribute;
