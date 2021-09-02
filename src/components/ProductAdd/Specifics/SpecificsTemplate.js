import React, { Component } from "react";
import Creatable from "../../MLSelect/CreatableSelect";
import STlistitem from "../Specifics/STlistitem";
import commonSpecs from "../../../util/commonSpecs.js";

class SpecificsTemplate extends Component {
  state = {
    specifications: [],
    sname: "",
    svalue: "",
  };

  onChange = (e) => {
    this.setState({
      svalue: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let specification = {
      sname: this.state.sname,
      svalue: this.state.svalue,
    };

    let cs = this.state.specifications;
    cs.push(specification);

    this.setState({
      specifications: cs,
    });
  };

  handleVarNameChanged = (e) => {
    if (typeof e !== undefined) {
      this.setState({
        sname: e.value,
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

  saveUse = () => {
    this.props.setFields(this.state.specifications);
  };

  removeslItem = (e) => {
    let ftd = [];
    this.state.specifications.forEach((x) => {
      if (e !== x) {
        ftd.push(x);
      }
    });

    this.setState({
      specifications: ftd,
    });
  };
  render() {
    return (
      <div className="">
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-4 px-0">
              <div className="d-flex w-100">
                <div class="input-group-prepend rounded-0">
                  <div class="input-group-text h6 mb-0 bold rounded-0">
                    &#43;
                  </div>
                </div>
                <div className="d-flex w-100">
                  <Creatable
                    options={commonSpecs}
                    spt={true}
                    handleChange={(n) => this.handleVarNameChanged(n)}
                    placeholder={"Name"}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <input
                onChange={this.onChange}
                className="form-control rounded-0"
                placeholder="Specification value"
              />
            </div>
            <div className="col-2 px-0">
              {this.state.sname && this.state.svalue ? (
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
        <div className="border-bottom">
          <div className="bold">Created fields</div>
          <div className="my-2">
            <ol className="pl-3 ml-selections-st">
              {this.state.specifications.map((x, index) => (
                <STlistitem
                  removeslItem={(n) => this.removeslItem(n)}
                  x={x}
                  key={index}
                />
              ))}
            </ol>
          </div>
        </div>
        <div className="container-fluid pt-3">
          <div className="row align-items-center">
            <div className="col-12 d-none px-0">
              <div>Template name</div>
            </div>
            <div className="col-6 d-flex align-items-center px-0 ">
              <div>
                <input
                  placeholder="Name this  template"
                  className="form-control d-none w-100 mt-2 mb-0"
                />
              </div>
            </div>
            <div className="col-6 d-flex  justify-content-end  px-0 align-items-center">
              {this.state.specifications.length > 0 ? (
                <>
                  {/* <button
                    onClick={this.saveFields}
                    className="ml-btn mr-2 mt-2"
                  >
                    Save Fields
                  </button> */}
                  <button onClick={this.saveUse} className="ml-dash-btn mt-2">
                    Use Fields
                  </button>
                </>
              ) : (
                <>
                  {/* <button disabled className="ml-btn mr-2 mt-2">
                    Save Fields
                  </button> */}
                  <button disabled className="ml-dash-btn mt-2">
                    Use Fields
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpecificsTemplate;
