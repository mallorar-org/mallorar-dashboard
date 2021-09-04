import React, { Component } from "react";
import store from "../../store/store";
import departments from "../../util/departments";
import MLSelect from "../MLSelect/MLSelect";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class ProductDepartment extends Component {
  state = {
    activeDepSlug: "",
    activeCatSlug: "",
    childCategories: [{ subCatName: "Choose Category" }],
    Category: [
      {
        subDName: "Choose Department",
        subCats: ["Choose Category"],
      },
    ],
    Departments: departments,
    selectedCat: "",
  };

  departmentOptions = () => {
    let departmentsList = [];
    departments.forEach((x) => {
      departmentsList.push({
        value: x.departmentName,
        label: x.departmentName.replace(/ n /g, " & "),
      });
    });

    return departmentsList;
  };
  childCategories = () => {
    let childCategories = [];

    this.state.childCategories.forEach((x) => {
      if (x.subCatName === "Choose Category") {
        childCategories.push({
          isDisabled: true,
          value: x.subCatName,
          label: x.subCatName.replace(/ n /g, " & "),
        });
      } else {
        childCategories.push({
          value: x.subCatName,
          label: x.subCatName.replace(/ n /g, " & "),
        });
      }
    });

    return childCategories;
  };

  onChangeCat = (e) => {
    // console.log("handle", e);
    let categories = [];

    this.state.Category.forEach((x) => {
      if (x.subDName === e.value) {
        categories = x.subCats;
      }
    });

    this.setState({
      childCategories: categories,
      selectedCat: e.value,
    });
    store.dispatch({ type: "SET_CAT", payload: e.value });
    this.child2.clearSelections();
  };
  onChangeDep = (e) => {
    let categories = [];
    this.state.Departments.forEach((x) => {
      if (x.departmentName === e.value) {
        categories = x.SubDepartments;

        let child = [];
        categories.forEach((x) => {
          if (x.subDName === categories[0].subDName) {
            child = x.subCats;
          }
        });

        this.setState({
          childCategories: child,
        });
        // console.log("=>>", child);
      }
    });

    store.dispatch({ type: "SET_DEP", payload: e.value });

    this.child1.clearSelections();
    this.child2.clearSelections();
    this.setState({
      Category: categories,
    });

    // let child = []
    // this.state.Category.forEach((x) => {
    //   if (x.name === this.state.Category[0].name) {
    //     child = (x.childCategories)
    //   }
    // })

    // this.setState({
    //   childCategories : child
    // })
  };

  onChangeSelection = (name, value) => {
    if (name === "subcat") {
      store.dispatch({ type: "SET_SUB_CAT", payload: value.value });
    }
  };

  depOptions = () => {
    let options = [];

    this.state.Category.forEach((x) => {
      if (x.subDName === "Choose Department") {
        options.push({
          isDisabled: true,
          value: x.subDName,
          label: x.subDName.replace(/ n /g, " & "),
        });
      } else {
        options.push({
          value: x.subDName,
          label: x.subDName.replace(/ n /g, " & "),
        });
      }
    });

    // console.log(options);
    return options;
  };

  globaltextfixer = (text) => {
    return (
      <span className="text-capitalize">
        {text.replace(/-/g, " ").replace(/ n /g, " & ")}
      </span>
    );
  };

  render() {
    // console.log(this.state);
    return (
      <div id="product_department" className="mt-4">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-2">
              <div className=" d-flex align-items-center pb-2">
                <span>Product Department*</span>
              </div>
            </div>
            <div className="col-10">
              <div className="container-fluid px-0">
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3">
                      <div className="mb-2">Main Department</div>
                      <MLSelect
                        use_prop_value={true}
                        value={
                          this.props.product.product_department
                            ? [
                                {
                                  value: this.props.product.product_department,
                                  label: this.globaltextfixer(
                                    this.props.product.product_department,
                                  ),
                                },
                              ]
                            : []
                        }
                        isSearchable={true}
                        placeholder="Select Department"
                        handleChange={(o) => this.onChangeDep(o)}
                        options={this.departmentOptions()}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3">
                      <div className="mb-2">Category</div>
                      <MLSelect
                        use_prop_value={true}
                        value={
                          this.props.product.product_category
                            ? [
                                {
                                  value: this.props.product.product_category,
                                  label: this.globaltextfixer(
                                    this.props.product.product_category,
                                  ),
                                },
                              ]
                            : []
                        }
                        useRef={true}
                        onRef1={(ref1) => (this.child1 = ref1)}
                        isSearchable={true}
                        placeholder="Select Category"
                        handleChange={(o) => this.onChangeCat(o)}
                        options={this.depOptions()}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <div className="mb-2">Sub-Category</div>
                      <MLSelect
                        use_prop_value={true}
                        value={
                          this.props.product.child_category
                            ? [
                                {
                                  value: this.props.product.child_category,
                                  label: this.globaltextfixer(
                                    this.props.product.child_category,
                                  ),
                                },
                              ]
                            : []
                        }
                        useRef={true}
                        onRef1={(ref) => (this.child2 = ref)}
                        isSearchable={true}
                        placeholder="Select Sub-Category"
                        handleChange={(o) =>
                          this.onChangeSelection("subcat", o)
                        }
                        options={this.childCategories()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-0 col-4"></div>
              <div className="mt-3 text-center">
                <a target="_blank" href="https://support.mallorar.com/support">
                  Report Missing Categories
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDepartment);
