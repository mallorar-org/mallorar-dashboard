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
    edit_state: true,
    add_variations: false,
    variation_names: [],
    variations: [],
    temp_variations: [],
    variationDafts: [],
  };

  switchToEdit = () => {
    this.setState({
      edit_state: true,
    });
  };
  switchToDisplay = () => {
    let variationDafts = this.state.variationDafts;

    let variation_names = [];
    let variations = [];

    // variationDafts.forEach((x) => {
    //   let variation_values = [];

    //   x.variableValues.forEach((x) => {
    //     variation_values.push({
    //       variation_name: "Color",
    //       value_value: "Red",
    //     });
    //   });

    //   variations.push({
    //     variation_index: x.variableIndex,
    //     stock_count: 1,
    //     variations_cost: 0.0,
    //     variation_values: variation_values,
    //   });
    // });

    //

    let other_variations = this.state.variationDafts;

    if (other_variations.length === 0) return;

    other_variations.forEach((x) => {
      variation_names.push(x.variableName);
    });

    other_variations[0].variableValues.forEach((v, index) => {
      let position = 0;
      position += 1;

      let pVar = [];

      if (other_variations.length === 1) {
        variations.push({
          variation_index: index + v.variationValue.toLowerCase(),
          stock_count: 1,
          variations_cost: 0.0,
          variation_values: {
            variation_name: other_variations[0].variableName,
            value_value: v.variationValue,
          },
        });
      }
      // with different price
      if (other_variations.length > position) {
        other_variations[position].variableValues.forEach((otherV) => {
          let tempVaval_2 = [];
          // tempVaval_2.push(v.variationValue);
          tempVaval_2.push({
            variation_name: other_variations[0].variableName,
            value_value: v.variationValue,
          });

          tempVaval_2.push({
            variation_name: other_variations[1].variableName,
            value_value: otherV.variationValue,
          });

          if (!(other_variations.length > position + 1)) {
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
          if (other_variations.length > position + 1) {
            other_variations[position + 1].variableValues.forEach(
              (other_otherV) => {
                let tempVaval_3 = [];
                tempVaval_3.push({
                  variation_name: other_variations[0].variableName,
                  value_value: v.variationValue,
                });
                tempVaval_3.push({
                  variation_name: other_variations[1].variableName,
                  value_value: otherV.variationValue,
                });
                tempVaval_3.push({
                  variation_name: other_variations[2].variableName,
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

    // console.log({ pVar });

    // this.setState({
    //   variationsToDisplay: pVar,
    // });

    //

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
        <div className="container-fluid">
          <div className="row border shadow-sm text-center bold">
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
              update_combination_cost={(c) => this.update_combination_cost(c)}
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
  };

  switchToAddvariations = () => {
    this.setState({
      add_variations: !this.state.add_variations,
    });
  };

  add_variation_toList = () => {
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
          <div className="ml-dash-tab-header-APP nav-tabs px-3 py-2  bg-white d-flex">
            <div to="#" role="tab">
              Create Variation
            </div>
          </div>
          <div className="pt-3">
            <div className="d-flex mb-3">
              <input
                id="txtNV_van"
                placeholder="Variation name"
                className="form-control rounded-0 "
                type="text"
              />
              <button
                disabled={this.state.variationDafts.length >= 3 ? true : false}
                onClick={this.add_variation_toList}
                type="button"
                className="ml-btn rounded-0 btn border-left-0 border"
              >
                Add
              </button>
            </div>
            <div>
              <table className="table table-bordered">
                <tr className="bold shadow-sm">
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
        <div className="ml-container py-0 px-0">
          <div className="mt-0 border-top">
            <div>
              <div className="ml-dash-tab-header-APP nav-tabs px-3 py-2  bg-white d-flex">
                <div to="#" role="tab">
                  Create Variation
                </div>
              </div>
            </div>
            <div className="">
              {this.state.variationDafts.map((x, index) => (
                <VariationControl
                  var_index={x.variableIndex}
                  var_data={x}
                  saveVariation={(n) => this.saveVariation(n)}
                  delete_var={() => this.delete_var(x.variableIndex)}
                  key={"v" + index}
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
            <button
              onClick={() => this.switchToDisplay()}
              className="btn ml-btn"
            >
              Save combination
            </button>
          )}
        </div>
      </div>
    );
  };

  update_combination_cost = () => {};

  render() {
    console.log("state=>", this.state);
    return (
      <div className="ml-card-shadow mt-4">
        <div className="card-body col-8">
          <div className="h5 bold ">
            <div className="d-flex justify-content-between align-items-center">
              <div className="">
                <h5 className="c-blue d-flex align-items-center ">
                  <FaStumbleupon className="ml-icon-size1 mr-2" />
                  <span className="bold c-blue">Variation combination</span>
                </h5>
              </div>
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
          <div>{this.tabinator()}</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariations);
