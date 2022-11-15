import axios from "axios";
import dayjs from "dayjs";
import React, { Component } from "react";
import Loading from "../../pages/loading";
import icons from "../common/icons";

class General extends Component {
  state = {
    editmode: false,
    loading: false,
    data: {},
    message: "",
  };

  edit = () => {
    return <div>es</div>;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("btnSaveGSettings").disabled = true;
    let adminEmail = document.getElementById("adminEmail").value;
    document.getElementById("btnSaveGSettings").innerHTML = "Saving";
    let baseCountry = document.getElementById("baseCountry").value;
    let isActive = document.getElementById("isActive").value;
    let onMaintance = document.getElementById("onMaintance").value;

    axios
      .post(`/dash/settings/general/edit/${this.state.data.id}`, {
        adminEmail: adminEmail,
        baseCountry: baseCountry,
        isActive: isActive,
        onMaintance: onMaintance,
      })
      .then(() => {
        document.getElementById("btnSaveGSettings").disabled = false;
        document.getElementById("btnSaveGSettings").innerHTML = "Save Changes";
        this.setState({
          message: "Your settings have been successfully saved",
        });
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("btnSaveGSettings").disabled = false;
      });
  };

  show = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4 className="bold border-bottom pb-3 c-blue">General Settings</h4>
          <div
            className={
              this.state.message
                ? "alert rounded-0  alert-success p-2 bold"
                : "d-none"
            }
          >
            <div className="p-0 px-2 navbar">
              <div className="">{this.state.message}</div>
              <div>
                <span
                  type="button"
                  onClick={() => this.setState({ message: "" })}
                  className="mb-0 h4 bold"
                >
                  &times;
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="contianer-fluid mt-3">
              <div className="mb-3 row d-flex align-items-center">
                <div className="col-6">
                  <div className="h6 c-blue-- mb-0">
                    Adminstration Email Adress
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <input
                      required
                      id="adminEmail"
                      defaultValue={this.state.data.adminEmail}
                      placeholder="e.g mallorarofficial@gmail.com"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3 row d-flex align-items-center">
                <div className="col-6">
                  <div className="h6 c-blue-- mb-0">Base Country</div>
                </div>
                <div className="col-6">
                  <div>
                    <select
                      id="baseCountry"
                      defaultValue={this.state.data.baseCountry}
                      className="form-control"
                    >
                      <option value="United States">United States</option>
                      {/* <option value="United States">Germany</option> */}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mb-3 row d-flex align-items-center">
                <div className="col-6">
                  <div className="h6 c-blue-- mb-0">Maintance</div>
                </div>
                <div className="col-6">
                  <div>
                    <select
                      id="onMaintance"
                      defaultValue={this.state.data.onMaintance}
                      className="form-control"
                    >
                      <option value="false">Off</option>
                      <option value="true">On</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mb-3 row d-flex align-items-center">
                <div className="col-6">
                  <div className="h6 c-blue-- mb-0">Active</div>
                </div>
                <div className="col-6">
                  <div>
                    <select
                      id="isActive"
                      defaultValue={this.state.data.isActive}
                      className="form-control"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mb-3 row d-flex align-items-center">
                <div className="col-6">
                  <div className="h6 c-blue-- mb-0">Shop ID</div>
                </div>
                <div className="col-6">
                  <div>
                    <input
                      readOnly
                      required
                      className="form-control"
                      defaultValue={this.state.data.ShopID}
                      placeholder="MS32"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 row d-flex align-items-center">
                <div className="col-6">
                  <div className="h6 c-blue-- mb-0">Date of Creation</div>
                </div>
                <div className="col-6">
                  <div>
                    <input
                      readOnly
                      className="form-control"
                      defaultValue={dayjs(this.state.data.dataCreated).format(
                        "L LT",
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button className="ml-dash-btn  no-outline">
                  <img
                    src={icons.solid.save.white}
                    alt=""
                    className="mr-2"
                    style={{ width: "16px" }}
                  />{" "}
                  <span id="btnSaveGSettings"> Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  componentDidMount = () => {
    axios
      .get("/dash/settings/general")
      .then((data) => {
        console.log(data.data);
        this.setState({
          data: data.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderComponent = () => {
    return this.show();
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="bg-blueish h5 mb-0 c-blue- p-2 rounded">
            Loading General Settings
          </div>
          <Loading loader={"2"} />
        </div>
      );
    }
    return <div className="">{this.renderComponent()}</div>;
  }
}

export default General;
