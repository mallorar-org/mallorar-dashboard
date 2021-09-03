import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store/store";

const mapStateToProps = (state) => {
  return {
    productAR: state.product,
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
      50,
    );
  };

  render() {
    return (
      <tr className="">
        <td>
          {this.props.productAR.product_specifications[this.props.index].sname}
        </td>
        <td>
          <input
            onChange={this.changeValue}
            defaultValue={
              this.props.productAR.product_specifications[this.props.index]
                .svalue
            }
            name={this.props.x.sname}
            type="text"
            className="ml-input"
          />
        </td>
        <td>
          <div
            onClick={() => this.props.removeslItem(this.props.x)}
            className=" a mb-0 cp"
          >
            Remove
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, null)(Pspecifics);
