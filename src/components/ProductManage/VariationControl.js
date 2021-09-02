import { random } from "chroma-js";
import React, { Component } from "react";
import { FaPencilAlt, FaPlus, FaStar } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import CheckBox from "../common/CheckBox";
import MLSelect from "../MLSelect/MLSelect";

const variationSuggested = [
  {
    label: <span className="bold text-dark mb-0">Primary Variations</span>,
    options: [
      {
        value: "width",
        label: "Width",
      },
      {
        value: "colour",
        label: "Colour",
      },
      {
        value: "size",
        label: "Size",
      },
      {
        value: "length",
        label: "Length",
      },
    ],
  },
  {
    label: <span className="bold text-dark mb-0">Not looking for these ?</span>,
    options: [
      {
        value: "create-new-variation",
        label: "Create new variation",
      },
    ],
  },
];

class VariationControl extends Component {
  state = {
    variationName: "",
    mlSelected: { value: "" },
    variantValues: [],
    vdstate: "1",
    stockDiff: false,
    priceDiff: false,
  };

  componentDidMount = () => {
    let rs = "vvalue" + Math.random() * 234565432;
    this.setState({
      vdstate: rs,
    });

    if (this.props.var_data.variableName) {
      this.setState({
        variationName: this.props.var_data.variableName,
        variantValues: this.props.var_data.variableValues,
        mlSelected: { value: this.props.var_data.variableName },
      });
    }
  };

  deleteVariation = () => {
    this.setState({
      variationName: "",
      mlSelected: { value: "" },
      variantValues: [],
      stockDiff: false,
      priceDiff: false,
    });
  };

  deleteVariantValue = (v) => {
    let updatedVariantValues = [];
    this.state.variantValues.forEach((x) => {
      if (x.variationValue !== v) {
        updatedVariantValues.push(x);
      }
    });

    this.setState({
      variantValues: updatedVariantValues,
    });
  };

  saveCustomVariation = () => {
    let name = document.getElementById("txtNV").value;
    this.setState({
      mlSelected: name,
      variationName: name,
    });
  };

  saveVariation = () => {
    let variableValues = [];
    this.state.variantValues.forEach((x) => {
      variableValues.push({
        variationValue: x.variationValue,
      });
    });

    let variationObject = {
      variableIndex: this.props.var_index,
      variableName: this.state.variationName,
      variableValues: variableValues,
    };

    this.props.saveVariation(variationObject);

    console.log(variationObject);
  };

  saveVariant = (e) => {
    e.preventDefault();

    let vvalue = document.getElementById(this.state.vdstate).value;
    let vvalues = this.state.variantValues;
    vvalues.push({
      variationValue: vvalue,
    });

    this.setState({
      variantValues: vvalues,
    });

    document.getElementById(this.state.vdstate).value = "";

    if (this.state.variantValues.length >= 2) {
      this.saveVariation();
    }
  };

  changeSelected = (n) => {
    this.setState({ mlSelected: n, variationName: n.label });
  };
  render() {
    console.log(this.state);
    return (
      <div className="border-bottom py-3 mb-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4 px-0">
              <div className="mt-">
                {this.state.mlSelected.value == "" ? (
                  <>
                    <div className="mb-2">Choose variation type</div>

                    <div className="w-75 position-relative">
                      <MLSelect
                        customStyles={customStyles}
                        handleChange={(n) => this.changeSelected(n)}
                        selectedOption={{
                          label: this.state.mlSelected.label,
                          value: this.state.mlSelected.value,
                        }}
                        options={variationSuggested}
                        placeholder="Select variation.."
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-100 position-relative">
                    {this.state.mlSelected.value !== "create-new-variation" ? (
                      <div className="d-flex align-items-center">
                        <span className="bold mr-2 h6 mb-0">
                          {this.state.variationName}
                        </span>
                        <span onClick={this.deleteVariation} className="cp">
                          <u>Delete</u>
                        </span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <span className="bold mr-2 h6 mb-0">
                          Name your variation :
                        </span>
                      </div>
                    )}

                    {this.state.mlSelected.value !== "create-new-variation" && (
                      <>
                        <div className="mt-2 t14"></div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-3 ">
                {/* <div className="form-control"> */}

                {this.state.mlSelected.value == "create-new-variation" && (
                  <div className="d-flex">
                    <input
                      id="txtNV"
                      placeholder="e.g Plug type"
                      className="form-control rounded-0 "
                      type="text"
                    />
                    <button
                      onClick={this.saveCustomVariation}
                      type="button"
                      className="ml-btn rounded-0 btn border-left-0 border"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>
            <div className="col-4">
              {this.state.variationName && (
                <>
                  {this.state.mlSelected.value !== "create-new-variation" && (
                    <>
                      <div className="text-secondary">
                        Add variants e.g Red, Blue for Colour
                      </div>
                      <div className="mt-2">
                        <form className="d-flex " onSubmit={this.saveVariant}>
                          <input
                            id={this.state.vdstate}
                            placeholder="Add variations"
                            className="form-control rounded-0"
                            type="text"
                          />
                          <button
                            type="button"
                            type="button"
                            onClick={this.saveVariant}
                            className="ml-btn shadow-none rounded-0 rounded-left btn border-left-0 border"
                          >
                            Add
                          </button>
                        </form>
                      </div>
                      <div className="mt-3">
                        <div className="container-fluid ">
                          {this.state.variantValues.map((x, index) => (
                            <VariantValues
                              key={"variantValues" + index}
                              x={x}
                              deleteVariantValue={(v) =>
                                this.deleteVariantValue(v)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function VariantValues({ x, deleteVariantValue }) {
  return (
    <div className="row border">
      <div className="col-10 py-2 px-3  d-flex align-items-center border-right">
        {x.variationValue}
      </div>

      <div className="col-2 p-2 text-center">
        <button
          onClick={() => deleteVariantValue(x.variationValue)}
          className="btn mb-0 p-0"
        >
          <RiCloseLine className="h4 mb-0" />
        </button>
      </div>
    </div>
  );
}

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

export default VariationControl;
