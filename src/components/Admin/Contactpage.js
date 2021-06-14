import React, { Component } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loading from "../../pages/loading";
toast.configure();

class Contactpage extends Component {
  state = {
    ccontactnumber: "",
    caddress: "",
    ctown: "",
    ccountry: "",
    loading: true,
  };

  toastNotify = (e, t) => {
    toast(e, { autoClose: false, position: "bottom-right", type: t });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount = () => {
    axios
      .get("/dash/getscp")
      .then((data) => {
        this.setState({
          ...data.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    document.getElementById("btnSave").disabled = true;
    document.getElementById("btnSave").innerHTML = "Saving Changes";
    axios
      .post("/dash/updatecdetails", this.state)
      .then(() => {
        console.log("done");
        document.getElementById("btnSave").disabled = false;
        document.getElementById("btnSave").innerHTML = "Save Changes";
        return this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Success</div>
            <div>Your store contact page has been updated successfully</div>
          </div>,
          toast.TYPE.SUCCESS
        );
      })
      .catch((err) => {
        document.getElementById("btnSave").disabled = false;
        document.getElementById("btnSave").innerHTML = "Save Changes";
        console.log(err);
        return this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Error #67</div>
            <div>We failed to update your store</div>
          </div>,
          toast.TYPE.ERROR
        );
      });
  };

  render() {
    console.log(this.state);

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="navbar p-0 bg-blueish rounded p-3">
          <div className="">
            <h4 className="">Contact Page</h4>
            <div>Provide your contact details for your contact page</div>
          </div>
          <div>
            <button
              id="btnSave"
              onClick={this.handleSave}
              className="ml-dash-btn"
            >
              Save Changes
              </button>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div className="row mt-3">
            <div className="col-6 mb-3">
              <div>Address Line</div>
              <input
                onChange={this.handleChange}
                name="caddress"
                required
                defaultValue={this.state.caddress}
                type="text"
                placeholder="e.g 14 Rasternburg Park, Neverland"
                className="form-control mt-2 col-8"
              />
            </div>
            <div className="col-6 mb-3">
              <div>City/Town</div>
              <input
                onChange={this.handleChange}
                name="ctown"
                required
                type="text"
                defaultValue={this.state.ctown}
                placeholder="e.g 14 Newcastle"
                className="form-control mt-2 col-8"
              />
            </div>
            <div className="col-6 mb-3">
              <div>Country</div>
              <input
                onChange={this.handleChange}
                name="ccountry"
                required
                type="text"
                defaultValue={this.state.ccountry}
                placeholder="e.g 14 United States, Neverland"
                className="form-control mt-2 col-8"
              />
            </div>
            <div className="col-6 mb-3">
              <div>
                Contact Number <small>(provide with code)</small>
              </div>
              <input
                onChange={this.handleChange}
                name="ccontactnumber"
                required
                defaultValue={this.state.ccontactnumber}
                type="text"
                placeholder="e.g 14  +1 000.."
                className="form-control mt-2 col-8"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Contactpage;
