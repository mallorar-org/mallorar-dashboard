import React, { Component } from "react";
import FileSelector from "../../components/FileSelector/FileSelector";

class Categories extends Component {
  state = {
    fileselector: false,
    category1img: "",
    category1active: "true",
    category1target: "",

    category2img: "",
    category2active: "true",
    category2target: "",

    category3img: "",
    category3active: "true",
    category3target: "",

    category4img: "",
    category4active: "true",
    category4target: "",

    availableCategories: [],
  };

  captureData = () => {
    this.props.getCategoryUrls([
      {
        category1img: this.state.category1img,
        category1active: this.state.category1active,
        category1target: this.state.category1target,
      },
      {
        category2img: this.state.category2img,
        category2active: this.state.category2active,
        category2target: this.state.category2target,
      },
      {
        category3img: this.state.category3img,
        category3active: this.state.category3active,
        category3target: this.state.category3target,
      },
      {
        category4img: this.state.category4img,
        category4active: this.state.category4active,
        category4target: this.state.category4target,
      },
    ]);
  };

  componentDidMount() {
    this.props.onRef2(this);
    this.setState({
      category1img: this.props.defaults.categories[0].category1img,
      category1active: this.props.defaults.categories[0].category1active,
      category1target: this.props.defaults.categories[0].category1target,

      category2img: this.props.defaults.categories[1].category2img,
      category2active: this.props.defaults.categories[1].category2active,
      category2target: this.props.defaults.categories[1].category2target,

      category3img: this.props.defaults.categories[2].category3img,
      category3active: this.props.defaults.categories[2].category3active,
      category3target: this.props.defaults.categories[2].category3target,

      category4img: this.props.defaults.categories[3].category4img,
      category4active: this.props.defaults.categories[3].category4active,
      category4target: this.props.defaults.categories[3].category4target,

      availableCategories: this.props.defaults.availableCategories,
    });
  }
  componentWillUnmount() {
    this.props.onRef2(undefined);
  }
  selectpicO = (e) => {
    let name = e.target.id;

    this.setState({
      fileselector: true,
      target: name,
    });
  };

  fileUrl = (x) => {
    this.setState({
      [this.state.target]: x,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  FileSelector = () => {
    if (this.state.fileselector) {
      return (
        <FileSelector
          url={(x) => this.fileUrl(x)}
          close={() => this.setState({ fileselector: false })}
        />
      );
    }
  };

  toggleCategoryActiveness = (e) => {
    if (e.target.name === "category1active") {
      if (this.state.category1active === "true") {
        this.setState({
          category1active: "false",
        });
      } else {
        this.setState({
          category1active: "true",
        });
      }
    }
    if (e.target.name === "category2active") {
      if (this.state.category2active === "true") {
        this.setState({
          category2active: "false",
        });
      } else {
        this.setState({
          category2active: "true",
        });
      }
    }
    if (e.target.name === "category3active") {
      if (this.state.category3active === "true") {
        this.setState({
          category3active: "false",
        });
      } else {
        this.setState({
          category3active: "true",
        });
      }
    }
    if (e.target.name === "category4active") {
      if (this.state.category4active === "true") {
        this.setState({
          category4active: "false",
        });
      } else {
        this.setState({
          category4active: "true",
        });
      }
    }
  };

  render() {
    console.log("category", this.state);
    return (
      <div className="ml-card-shadow mt-3 r-0 p-3">
        {this.FileSelector()}

        <div>
          <h5 className="mb-0 bold">Category Section</h5>
          <div>
            Display a maximum of 4 cards featuring your chosen categories on
            your home page for your customers
          </div>
        </div>
        <div className="mt-2 text-center c-blue-">
          <div className="container-fluid text-center p-0 ">
            <div className="row text-center d-flex justify-content-center">
              <div className="col-3 p-1">
                <div
                  className={
                    this.state.category1active === "true"
                      ? " border ml-card-shadow r-0 p-2"
                      : "border r-0 p-2"
                  }
                >
                  <div className="mb-2 bold">Category 1</div>
                  <div className="mb-2 bold">
                    {" "}
                    <label class="ml-switch">
                      <input
                        type="checkbox"
                        name="category1active"
                        checked={
                          this.state.category1active === "true" ? "checked" : ""
                        }
                        onChange={this.toggleCategoryActiveness}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <img
                    className="img-fluid img-thumbnail c-i-p-v"
                    src={this.state.category1img}
                    alt=""
                  />
                  <div className="text-left p-2">
                    <div className="text-center">
                      {" "}
                      <button
                        id="category1img"
                        onClick={this.selectpicO}
                        className="ml-dash-btn"
                      >
                        Change Picture
                      </button>
                    </div>
                    <div>Select Category :</div>
                    <div className="text-center">
                      {this.state.category1target ? (
                        <select
                          onChange={this.handleChange}
                          defaultValue={this.state.category1target}
                          name={"category1target"}
                          className="form-control mt-1 text-capitalize"
                        >
                          {" "}
                          <option value="all">All</option>
                          {this.state.availableCategories.map((x, index) => (
                            <option
                              key={index}
                              className="text-capitalize"
                              value={x}
                            >
                              {" "}
                              {x.replace(/-/g, " ")}{" "}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "wait"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-3 p-1">
                <div
                  className={
                    this.state.category2active === "true"
                      ? " border ml-card-shadow r-0 p-2"
                      : "border r-0 p-2"
                  }
                >
                  <div className="mb-2 bold">Category 2</div>
                  <div className="mb-2 bold">
                    {" "}
                    <label class="ml-switch">
                      <input
                        type="checkbox"
                        name="category2active"
                        checked={
                          this.state.category2active === "true" ? "checked" : ""
                        }
                        onChange={this.toggleCategoryActiveness}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <img
                    className="img-fluid img-thumbnail c-i-p-v"
                    src={this.state.category2img}
                    alt=""
                  />
                  <div className="text-left p-2">
                    <div className="text-center">
                      {" "}
                      <button
                        id="category2img"
                        onClick={this.selectpicO}
                        className="ml-dash-btn"
                      >
                        Change Picture
                      </button>
                    </div>
                    <div>Select Category :</div>
                    <div>
                      {this.state.category2target ? (
                        <select
                          onChange={this.handleChange}
                          defaultValue={this.state.category2target}
                          name={"category2target"}
                          className="form-control mt-1 text-capitalize"
                        >
                          <option value="all">All</option>
                          {this.state.availableCategories.map((x, index) => (
                            <option
                              key={index}
                              className="text-capitalize"
                              value={x}
                            >
                              {x.replace(/-/g, " ")}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "wait"
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-3 p-1">
                <div
                  className={
                    this.state.category3active === "true"
                      ? " border ml-card-shadow r-0 p-2"
                      : "border r-0 p-2"
                  }
                >
                  <div className="mb-2 bold">Category 3</div>
                  <div className="mb-2 bold">
                    {" "}
                    <label class="ml-switch">
                      <input
                        name="category3active"
                        type="checkbox"
                        checked={
                          this.state.category3active === "true" ? "checked" : ""
                        }
                        onChange={this.toggleCategoryActiveness}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <img
                    className="img-fluid img-thumbnail c-i-p-v"
                    src={this.state.category3img}
                    alt=""
                  />
                  <div className="text-left p-2">
                    <div className="text-center">
                      {" "}
                      <button
                        id="category3img"
                        onClick={this.selectpicO}
                        className="ml-dash-btn"
                      >
                        Change Picture
                      </button>
                    </div>
                    <div>Select Category :</div>
                    <div>
                      {this.state.category3target ? (
                        <select
                          onChange={this.handleChange}
                          defaultValue={this.state.category3target}
                          name={"category3target"}
                          className="form-control mt-1 text-capitalize"
                        >
                          <option value="all">All</option>
                          {this.state.availableCategories.map((x, index) => (
                            <option
                              key={index}
                              className="text-capitalize"
                              value={x}
                            >
                              {x.replace(/-/g, " ")}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "wait"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 p-1">
                <div
                  className={
                    this.state.category4active === "true"
                      ? " border ml-card-shadow r-0 p-2"
                      : "border r-0 p-2"
                  }
                >
                  <div className="mb-2 bold">Category 4</div>
                  <div className="mb-2 bold">
                    {" "}
                    <label class="ml-switch">
                      <input
                        name="category4active"
                        type="checkbox"
                        checked={
                          this.state.category4active === "true" ? "checked" : ""
                        }
                        onChange={this.toggleCategoryActiveness}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <img
                    className="img-fluid img-thumbnail c-i-p-v"
                    src={this.state.category4img}
                    alt=""
                  />
                  <div className="text-left p-2">
                    <div className="text-center">
                      {" "}
                      <button
                        id="category4img"
                        onClick={this.selectpicO}
                        className="ml-dash-btn"
                      >
                        Change Picture
                      </button>
                    </div>
                    <div>Select Category :</div>
                    <div>
                      {this.state.category4target ? (
                        <select
                          onChange={this.handleChange}
                          defaultValue={this.state.category4target}
                          name={"category4target"}
                          className="form-control mt-1 text-capitalize"
                        >
                          <option value="all">All</option>
                          {this.state.availableCategories.map((x, index) => (
                            <option
                              key={index}
                              className="text-capitalize"
                              value={x}
                            >
                              {x.replace(/-/g, " ")}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "wait"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
