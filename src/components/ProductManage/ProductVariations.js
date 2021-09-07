import React, { Component } from "react";
import { MDBModal, MDBModalBody } from "mdbreact";
import { FaStumbleupon } from "react-icons/fa";
import Variation from "./Variation";
import VariationControl from "./VariationControl";
import VariationEditControl from "./VariationEditControl";
import VariationCombRow from "./VariationCombRow";
import { update_product_variations } from "../../store/actions/productActions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    variations: state.product.product_variations,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    update_product_variations: (v) => dispatch(update_product_variations(v)),
  };
};

class ProductVariations extends Component {
  state = {
    edit_state: false,
    add_variations: false,
    variation_names: [],
    variationDafts: [],
  };

  componentDidMount = () => {
    let variation_names = [];

    this.props.variations.length > 0 &&
      this.props.variations[0].variation_values.forEach((x) => {
        variation_names.push(x.variation_name);
      });

    this.setState({
      variation_names,
    });
  };

  delete_var = (index) => {
    let currentvariationDafts = this.state.variationDafts;

    let filteredDafts = [];
    currentvariationDafts.forEach((x) => {
      if (x.variableIndex !== index) {
        filteredDafts.push(x);
      }
    });

    this.setState({
      variationDafts: filteredDafts,
    });
  };

  switchToEdit = () => {
    this.setState({
      edit_state: true,
    });
  };
  switchToDisplay = () => {
    //
    let variation_names = [];
    let variations = [];
    let variationDafts = this.state.variationDafts;

    if (variationDafts.length === 0) return;

    variationDafts.forEach((x) => {
      variation_names.push(x.variableName);
    });

    variationDafts[0].variableValues.forEach((v, index) => {
      let position = 0;
      position += 1;
      let pVar = [];

      if (variationDafts.length === 1) {
        console.log("supposed to end here");
        let tempVaval_1 = [];
        tempVaval_1.push({
          variation_name: variationDafts[0].variableName,
          value_value: v.variationValue,
        });
        variations.push({
          variation_index: index + v.variationValue.toLowerCase(),
          stock_count: 1,
          variations_cost: 0.0,
          variation_values: tempVaval_1,
        });

        this.props.update_product_variations(variations);
        return this.setState({
          variation_names,
          edit_state: false,
        });
      }
      // with different price
      if (variationDafts.length > position) {
        variationDafts[position].variableValues.forEach((otherV) => {
          let tempVaval_2 = [];
          // tempVaval_2.push(v.variationValue);
          tempVaval_2.push({
            variation_name: variationDafts[0].variableName,
            value_value: v.variationValue,
          });

          tempVaval_2.push({
            variation_name: variationDafts[1].variableName,
            value_value: otherV.variationValue,
          });

          if (!(variationDafts.length > position + 1)) {
            pVar.push(tempVaval_2);
            variations.push({
              variation_index:
                index +
                (v.variationValue + otherV.variationValue).toLowerCase(),
              stock_count: 1,
              variations_cost: 0.0,
              variation_values: tempVaval_2,
            });
          }
          if (variationDafts.length > position + 1) {
            variationDafts[position + 1].variableValues.forEach(
              (other_otherV) => {
                let tempVaval_3 = [];
                tempVaval_3.push({
                  variation_name: variationDafts[0].variableName,
                  value_value: v.variationValue,
                });
                tempVaval_3.push({
                  variation_name: variationDafts[1].variableName,
                  value_value: otherV.variationValue,
                });
                tempVaval_3.push({
                  variation_name: variationDafts[2].variableName,
                  value_value: other_otherV.variationValue,
                });
                // tempVaval_3.push(other_otherV.variationValue);
                pVar.push(tempVaval_3);
                variations.push({
                  variation_index:
                    index +
                    (
                      v.variationValue +
                      otherV.variationValue +
                      other_otherV.variationValue
                    ).toLowerCase(),
                  stock_count: 1,
                  variations_cost: 0.0,
                  variation_values: tempVaval_3,
                });
              },
            );
          }
        });
      } else {
        let tempVaval = [];
        tempVaval.push(v.variationValue);
        pVar.push(tempVaval);
      }
      // console.log({ pVar });
    });

    this.props.update_product_variations(variations);
    this.setState({
      variation_names,
      edit_state: false,
    });
  };

  tabinator = () => {
    switch (this.state.edit_state) {
      case false:
        return this.displayTab();
      case true:
        return this.editTab();
      default:
        return this.displayTab();
    }
  };

  displayTab = () => {
    return (
      <>
        {this.props.variations.length === 0 && (
          <>
            <div className="mb-2 pt-2">Add at least 1 product variation</div>
            <button
              onClick={() =>
                this.setState({
                  edit_state: true,
                })
              }
              className="btn ml-btn"
            >
              Add combination
            </button>
          </>
        )}
        <div className="ml-dash-tab-header-APP nav-tabs py-2  bg-white d-flex">
          <div to="#" role="tab">
            Give your variations seperate costs. Leave cost as 0 if the cost
            doesn't change with selected variations.
          </div>
        </div>
        <div className="container-fluid">
          <div className="row border bg-light shadow-sm text-center bold">
            {this.state.variation_names.map((x) => (
              <div className="col-2 p-2 border-right">{x}</div>
            ))}
            <div className="col-3 border-right p-2">Price</div>
            <div className="col-3 p-2">Stock</div>
          </div>
          {this.props.variations.map((x) => (
            <VariationCombRow
              variation_names={this.state.variation_names}
              x={x}
              key={x.variation_index}
            />
          ))}
        </div>
      </>
    );
  };

  saveVariation = (n) => {
    let cv = this.state.variationDafts;
    let vindex = -1;
    cv.forEach((x, index) => {
      if (x.variableName === n.variableName) {
        vindex = index;
      }
    });
    if (vindex === -1) {
      cv.push(n);
    } else {
      cv[vindex] = n;
    }

    if (cv.length > this.state.variationDafts.length) {
    }

    this.setState({
      variationDafts: cv,
    });
    console.log("save to drafts", cv);
  };

  switchToAddvariations = () => {
    this.setState({
      add_variations: !this.state.add_variations,
    });
  };

  add_variation_toList = (e) => {
    e.preventDefault();
    let txtNV_van = document.getElementById("txtNV_van").value;
    document.getElementById("txtNV_van").value = "";

    let variationDafts = this.state.variationDafts;
    let v_index = -1;
    let new_index = 0;
    if (variationDafts.length < 3) {
      variationDafts.forEach((x, index) => {
        if (x.variableName === txtNV_van) {
          v_index = index;
        }

        if (x.variableIndex > new_index) {
          new_index = x.variableIndex;
        }
      });

      if (v_index === -1) {
        variationDafts.push({
          variableIndex: new_index + 1,
          variableName: txtNV_van,
          variableValues: [],
        });
      }
    }

    this.setState({
      variationDafts,
    });
  };

  remove_var_from_list = (index) => {
    let current_List = this.state.variationDafts;
    let newlist = [];
    current_List.forEach((x) => {
      if (x.variableIndex !== index) {
        newlist.push(x);
      }
    });

    this.setState({
      variationDafts: newlist,
    });
  };

  editTab = () => {
    if (this.state.add_variations) {
      return (
        <div>
          <div className="ml-dash-tab-header-APP nav-tabs py-2  bg-white d-flex">
            <div to="#" role="tab">
              Add up to 3 different variations
            </div>
          </div>
          <div className="pt-3 col-6 px-0">
            <form onSubmit={this.add_variation_toList} className="d-flex mb-3">
              <input
                id="txtNV_van"
                placeholder="Variation name"
                className="form-control rounded-0 "
                type="text"
              />
              <button
                disabled={this.state.variationDafts.length >= 3 ? true : false}
                type="submit"
                className="ml-btn rounded-0 btn border-left-0 border"
              >
                Add
              </button>
            </form>
            <div>
              <table className="table table-bordered">
                <tr className="bold bg-light shadow-sm">
                  <td>Variation name</td>
                  <td>Action</td>
                </tr>
                {this.state.variationDafts.map((x) => (
                  <tr key={x.variableIndex}>
                    <td>{x.variableName}</td>
                    <td>
                      <button
                        onClick={() =>
                          this.remove_var_from_list(x.variableIndex)
                        }
                        className="ml-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div className="py-3">
            <button
              onClick={() => this.switchToAddvariations()}
              className="btn ml-btn"
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="py-0 px-0">
          <div className="mt-0">
            <div>
              <div className="ml-dash-tab-header-APP nav-tabs bold py-2  bg-white d-flex">
                <div to="#" role="tab">
                  Create Variation
                </div>
              </div>
            </div>
            {/* <div>
              <div className="ml-dash-tab-header-APP nav-tabs px-3 py-2  bg-white d-flex">
                <div to="#" role="tab">
                  Create Variation
                </div>
              </div>
            </div> */}
            <div className="">
              {this.state.variationDafts.map((x) => (
                <VariationControl
                  var_index={x.variableIndex}
                  var_data={x}
                  saveVariation={(n) => this.saveVariation(n)}
                  delete_var={() => this.delete_var(x.variableIndex)}
                  key={"v" + x.variableIndex}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="py-3">
          {this.state.variationDafts.length === 0 ? (
            <button
              onClick={() => this.switchToAddvariations()}
              className="btn ml-btn"
            >
              Add Product Variations
            </button>
          ) : (
            <>
              <button
                onClick={() =>
                  this.setState({
                    add_variations: true,
                  })
                }
                className="btn ml-btn mr-2"
              >
                Edit combinations
              </button>

              <button
                onClick={() => this.switchToDisplay()}
                className="btn ml-btn"
              >
                Save combination
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  render() {
    console.log("state=>", this.state);
    return (
      <div className="mt-4">
        <div className="px-0">
          <div className="container-fluid px-0">
            <div className="row">
              <div className="col-2">
                <div className="d-flex align-items-center ">
                  <span>Variations</span>
                </div>
              </div>
              <div className="col-10">
                <div className="h5 bold mb-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className=""></div>
                    <div>
                      {!this.state.edit_state && (
                        <button
                          onClick={() => this.switchToEdit()}
                          className="btn ml-btn"
                        >
                          Edit combination
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="mb-2">
                    List all available product variations with seperate pricing
                    and multi-quantity
                  </div>

                  <div>{this.tabinator()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariations);
