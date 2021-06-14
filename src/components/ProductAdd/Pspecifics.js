import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store/store";

const mapStateToProps = (state) => {
  return {
    productAR: state.productAR,
  };
};

class Pspecifics extends Component {
  state = {};

  changeValue = (e) => {
    let v = e.target.value;
    setTimeout(
      () =>
        store.dispatch({
          type: "CHANGE_SPEC_FIELD_VALUE",
          payload: { sname: this.props.x.sname, svalue: v },
        }),
      50
    );
  };

  render() {
    return (
      <div className="d-flex mb-3 ">
        <div class="form-group d-flex align-items-center">
          <label for="Student" className="mr-3 mb-0">
            {this.props.productAR.specifications[this.props.index].sname} :
          </label>
          <input
            onChange={this.changeValue}
            defaultValue={
              this.props.productAR.specifications[this.props.index].svalue
            }
            name={this.props.x.sname}
            type="text"
            className="ml-input"
          />
          <div
            onClick={() => this.props.removeslItem(this.props.x)}
            className="bold h4 mb-0 pl-3 cp"
          >
            &times;
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Pspecifics);
