import React, { Component } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "0.8rem",
    paddingLeft: "1.5rem",
    cursor: "pointer",
    background: state.isFocused ? "#eff2f6" : "#fff",
    color: state.isDisabled ? "#dedede" : state.isFocused ? "#12405d" : "black",
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    boxShadow: "none",
    border: state.isFocused ? "1px solid #12405d" : "1px solid #ced4da",
    borderColor: state.isFocused ? "1px solid #12405d" : "1px solid #ced4da",
  }),
};

class MLSelect extends Component {
  state = {
    placeholder: this.props.placeholder,
    options: this.props.options,
    handleChange: null,
    isSearchable: false,
    selectedOption: this.props.defaultValue ? this.props.defaultValue : [],
  };

  componentDidMount() {
    if (this.props.useRef) {
      this.props.onRef1(this);
    }
  }
  componentWillUnmount() {
    if (this.props.useRef) {
      this.props.onRef1(undefined);
    }
  }

  captureData() {
    console.log("es");
  }

  handletrigger = (sO) => {
    this.setState({
      selectedOption: sO,
    });

    this.props.handleChange(sO);
    // console.log(`Option selected:`, selectedOption);
  };

  clearSelections = () => {
    this.setState({
      selectedOption: [],
    });
    this.props.handleChange([{ value: "" }]);
  };

  render() {
    return (
      <Select
        isSearchable={this.props.isSearchable ? true : false}
        value={this.state.selectedOption}
        onChange={this.handletrigger}
        placeholder={this.props.placeholder}
        options={this.props.options}
        styles={
          this.props.customStyles ? this.props.customStyles : customStyles
        }
      />
    );
  }
}

export default MLSelect;
