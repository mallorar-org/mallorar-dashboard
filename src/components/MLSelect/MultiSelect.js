import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    background: state.isFocused ? "#eff2f6" : "#fff",
    color: state.isDisabled ? "#dedede" : state.isFocused ? "#12405d" : "black",
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    boxShadow: "none",
    borderRadius: "none",
    border: state.isFocused ? "1px solid #12405d" : "1px solid #ced4da",
    borderColor: state.isFocused ? "1px solid #12405d" : "1px solid #ced4da",
  }),
};

export default class CreatableMulti extends Component {
  handleChange = (newValue, actionMeta) => {
    console.group("Multi Select");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();

    if (newValue) {
      this.props.handleChange(newValue);
    } else {
      this.props.handleChange([]);
    }
  };

  render() {
    return (
      <CreatableSelect
        isMulti
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
        styles={customStyles}

        // options={colourOptions}
      />
    );
  }
}
