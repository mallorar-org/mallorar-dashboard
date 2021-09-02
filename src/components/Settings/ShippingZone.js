import React, { Component } from "react";
import axios from "axios";

class ShippingZone extends Component {
  state = {
    edit: false,
  };

  save = () => {
    let Scost = document.getElementById("Shippingcost").value;

    document.getElementById(this.props.x.id).innerHTML = "Saving";

    axios
      .post(`/dash/shippingzone/update/${this.props.x.id}`, {
        cost: Scost,
      })
      .then(() => {

        document.getElementById(this.props.x.id).innerHTML = "Save";
        this.props.reload()
        return this.setState({ edit: false })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderComponent = () => {
    if (this.state.edit) {
      return this.edit();
    }
    if (!this.state.edit) {
      return this.view();
    }
  };

  delete = () => {
    document.getElementById(this.props.index).innerHTML = "Deleting";
    axios
      .get(`/dash/zone/delete/${this.props.x.id}`)
      .then(() => {
        document.getElementById(this.props.index).innerHTML = "Delete Zone";
        this.props.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  edit = () => {
    return (
      <div className=" c-blue-">
        <div>
          <div>
            <div className="">
              <h5 className="bold mb-0">Edit Shipping Zone</h5>
            </div>
            <div className="">
              Shipping Zone Name : <strong>{this.props.x.zoneName}</strong>
            </div>
          </div>
          <div className="mt-3">
            <div className="p-0 navbar">
              <div className="">
                <input
                  defaultValue={this.props.x.cost}
                  placeholder="e.g Shipping Cost"
                  className="form-control "
                  type="number"
                  id="Shippingcost"
                />
                <div>Shipping Cost</div>
              </div>
              <div className="">
                <div>
                  <button
                    onClick={this.save}
                    id={this.props.x.id}
                    className="btn btn-success mr-1 px-3 shadow-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => this.setState({ edit: false })}
                    className="btn shadow-none btn-danger  "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  view = () => {
    return (
      <div className="navbar c-blue-">
        <div>
          <div className="bold">{this.props.x.zoneName}</div>
          <div>Shipping Cost for Zone | ${this.props.x.cost}</div>
        </div>
        <div>
          <button
            onClick={() => this.setState({ edit: true })}
            className="ml-dash-btn  no-outline mr-1"
          >
            Edit
          </button>
          <button
            id={this.props.index}
            onClick={() => this.delete()}
            className="btn shadow-none btn-danger  "
          >
            Delete Zone
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="mb-2">
        <div className="card card-body  ml-card-shadow">
          {this.renderComponent()}
        </div>
      </div>
    );
  }
}

export default ShippingZone;
