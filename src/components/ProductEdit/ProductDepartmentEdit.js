import React, { Component } from "react";
import departments from "../../util/departments";
import MLSelect from "../MLSelect/MLSelect";

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

  onChangeCat = (e) => {
    console.log("handle", e);
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
  };
  onChangeDep = (e) => {
    let categories = [];
    this.state.Departments.forEach((x) => {
      if (x.departmentName === e.target.value) {
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
        console.log("=>>", child);
      }
    });

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

  componentDidMount() {
    this.props.onRef5(this);
  }
  componentWillUnmount() {
    this.props.onRef5(undefined);
  }

  depOptions = () => {
    let options = [];

    this.state.Category.forEach((x) => {
      options.push({
        value: x.subDName,
        label: x.subDName,
      });
    });

    console.log(options);
    return options;
  };

  captureData = () => {
    let productDepartment = document.getElementById("productDepartment").value;
    let productCategory = this.state.selectedCat;
    let childCategry = document.getElementById("childCategry").value;
    let brand = document.getElementById("brand").value;

    let productDep = {
      productDepartment: productDepartment.replace(/ /, "-").toLowerCase(),
      productCategory: productCategory.replace(/ /, "-").toLowerCase(),
      childCategry: childCategry.replace(/ /, "-").toLowerCase(),
      brand: brand.replace(/ /, "-").toLowerCase(),
    };

    this.props.getDep(productDep);
  };
  render() {
    console.log(this.state);
    return (
      <div className="card card-body ml-card-shadow p-2 card-block mt-3 ml-2">
        <h6 className="py-2 c-blue text-center bold border-bottom">
          Department
        </h6>
        <div className="">
          <div>
            <span>Departmemt</span>
            <select
              className="ml-dash-productAdd-dropdown form-control"
              onChange={this.onChangeDep}
              id="productDepartment"
              placeholder="select option"
            >
              {this.state.Category[0].subDName === "Choose Department" ? (
                <option>Select Department</option>
              ) : (
                <option disabled>Select Department</option>
              )}

              {this.state.Departments.map((x, index) => (
                <option key={index} value={x.departmentName}>
                  {x.departmentName}
                </option>
              ))}
            </select>
          </div>
          <div className="my-3">
            <span className="mb-2">Category</span>
            <MLSelect
              placeholder="Select category"
              handleChange={(o) => this.onChangeCat(o)}
              options={this.depOptions()}
            />
          </div>
          <div>
            <span>Sub-Category</span>
            <select
              className="ml-dash-productAdd-dropdown form-control"
              id="childCategry"
              onChange={this.onChangeFM}
            >
              {this.state.childCategories.map((x, index) => (
                <option key={index} value={x.subCatName}>
                  {x.subCatName}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <h6 className="c-blue bold">Brand</h6>
            <input
              id="brand"
              className="form-control"
              placeholder="e.g Apple"
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

export default ProductDepartment;
