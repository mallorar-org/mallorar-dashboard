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
      childCategories.push({
        value: x.subCatName,
        label: x.subCatName.replace(/ n /g, " & "),
      });
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
      options.push({
        value: x.subDName,
        label: x.subDName.replace(/ n /g, " & "),
      });
    });

    // console.log(options);
    return options;
  };

  render() {
    // console.log(this.state);
    return (
      <div className="card card-body ml-card- card-block mt-3">
        <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
          {/* <BiDetail className="ml-icon-size2 mr-2" /> */}
          <span className="bold c-blue">Department</span>
        </h5>

        <div className="mt-2 px-0 col-4">
          <div>
            <div className="mb-2">Departmemt</div>
            <MLSelect
              defaultValue={
                this.props.product.productDepartment !== ""
                  ? [
                      {
                        value: this.props.product.productDepartment,
                        label: this.props.product.productDepartment,
                      },
                    ]
                  : [{ value: "Select Department", label: "Select Department" }]
              }
              isSearchable={true}
              placeholder="Select Department"
              handleChange={(o) => this.onChangeDep(o)}
              options={this.departmentOptions()}
            />
          </div>
          <div className="my-3">
            <div className="mb-2">Category</div>
            <MLSelect
              useRef={true}
              onRef1={(ref1) => (this.child1 = ref1)}
              isSearchable={true}
              defaultValue={
                this.props.product.productCategory !== ""
                  ? [
                      {
                        value: this.props.product.productCategory,
                        label: this.props.product.productCategory,
                      },
                    ]
                  : [{ value: "Select Category", label: "Select Category" }]
              }
              placeholder="Select Category"
              handleChange={(o) => this.onChangeCat(o)}
              options={this.depOptions()}
            />
          </div>
          <div>
            <div className="mb-2">Sub-Category</div>
            <MLSelect
              useRef={true}
              onRef1={(ref) => (this.child2 = ref)}
              isSearchable={true}
              value={[
                {
                  value: "Select Sub-Category",
                  label: "Select Sub-Category",
                },
              ]}
              defaultValue={
                this.props.product.childCategry !== ""
                  ? [
                      {
                        value: this.props.product.childCategry,
                        label: this.props.product.childCategry,
                      },
                    ]
                  : [
                      {
                        value: "Select Sub-Category",
                        label: "Select Sub-Category",
                      },
                    ]
              }
              placeholder="Select Sub-Category"
              handleChange={(o) => this.onChangeSelection("subcat", o)}
              options={this.childCategories()}
            />
          </div>

          <div className="mt-3 text-center">
            <a href="https://support.mallorar.com/categories">
              Report Missing Categories
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductDepartment);
