import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";
const colourOptions = [
  { value: "Colour", label: "sA - Colour" },
  { value: "Size", label: "sA - Size" },
];

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
    border: state.isFocused ? "1px solid #12405d" : "1px solid #ced4da",
    borderRadius: "none",
    borderColor: state.isFocused ? "1px solid #12405d" : "1px solid #ced4da",
  }),
};

export default class CreatableSingle extends Component {
  handleChange = (newValue, actionMeta) => {
    // console.group("Value Changed");
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    if (newValue) {
      this.props.handleChange(newValue);
    } else {
      this.props.handleChange({ label: "", value: "" });
    }
  };
  handleInputChange = (inputValue, actionMeta) => {
    // console.group("Input Changed");
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect
        isClearable
        placeholder={this.props.placeholder}
        isOptionSelected
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={this.props.spt ? this.props.options : colourOptions}
        styles={customStyles}
      />
    );
  }
}
