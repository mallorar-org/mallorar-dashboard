import React, { Component } from "react";
import Loading from "../../pages/loading";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import FileSelector from "../../components/FileSelector/FileSelector";

toast.configure();
class Storeinformation extends Component {
  state = {
    loading: true,
    storeTag: "",
    storeName: "",
    storeLogo: "",
    storeFeaturedImage: "",
    fileselector: false,
    storeDescription: "",
    storeWebsite: "",
  };

  toastNotify = (e, t) => {
    toast(e, { autoClose: false, position: "bottom-right", type: t });
  };

  componentDidMount = () => {
    axios
      .get("/dash/getstoredefaults")
      .then((res) => {
        console.log(res.data);
        this.setState({
          ...res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  handleSave = () => {
    if (this.state.storeName === "") {
      return this.toastNotify(
        <div>
          <div className="bold h6 mb-0">Warning</div>
          <div>Please provide a valid store name</div>
        </div>,
        toast.TYPE.WARNING
      );
    }
    if (this.state.storeDescription === "") {
      return this.toastNotify(
        <div>
          <div className="bold h6 mb-0">Warning</div>
          <div>
            Give your store a short desciption for your customers to understand
            you
          </div>
        </div>,
        toast.TYPE.WARNING
      );
    }
    if (this.state.storeName === "") {
      return this.toastNotify(
        <div>
          <div className="bold h6 mb-0">Warning</div>
          <div>Please provide a valid store name</div>
        </div>,
        toast.TYPE.WARNING
      );
    }
    if (this.state.storeTag === "") {
      return this.toastNotify(
        <div>
          <div className="bold h6 mb-0">Warning</div>
          <div>Please provide a valid store tag</div>
        </div>,
        toast.TYPE.WARNING
      );
    }

    document.getElementById("btnSave").innerHTML = "Saving";
    document.getElementById("btnSave").disabled = true;

    axios
      .post("/dash/updatedefaults", this.state)
      .then(() => {
        document.getElementById("btnSave").innerHTML = "Save Changes";
        document.getElementById("btnSave").disabled = false;
        this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Success</div>
            <div>Your changes have been saved successfully</div>
          </div>,
          toast.TYPE.SUCCESS
        );
      })
      .catch(() => {
        document.getElementById("btnSave").innerHTML = "Save Changes";
        document.getElementById("btnSave").disabled = false;
        this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Caught Error</div>
            <div>We encountered an error, please retry or contact support</div>
          </div>,
          toast.TYPE.ERROR
        );
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    console.log(this.state);

    if (this.state.loading) {
      return <Loading loader={"3"} />;
    }
    return (
      <div>
        {this.FileSelector()}
        <div className="d-flex border-bottom pb-2 justify-content-between align-items-center/ p-0">
          <div className="">
            <h4 className="mb-0 bold c-blue">General</h4>
            <div>Manage and control your store profile</div>
          </div>
          <div>
            <button
              id="btnSave"
              onClick={this.handleSave}
              className="btn-outline-info btn t15  "
            >
              Save Settings
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="container-fluid row">
            <div className="col-12 col-md-6 col-lg-6 ">
              <div className="">
                <div>Store Name</div>
                <input
                  onChange={this.handleChange}
                  name="storeName"
                  defaultValue={this.state.storeName}
                  className="form-control mt-1 mb-4  col-8 mb-3"
                  placeholder="e.g Mallorar Official"
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="">
                <div>Store Tag</div>
                <input
                  onChange={this.handleChange}
                  name="storeTag"
                  defaultValue={this.state.storeTag}
                  className="form-control mt-1 mb-4  col-8 mb-3"
                  placeholder="e.g The official mallorar store"
                  type="text"
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <div className="">
                <div>Main Website</div>
                <input
                  onChange={this.handleChange}
                  name="storeWebsite"
                  defaultValue={this.state.storeWebsite}
                  className="form-control mt-1 mb-4  col-8"
                  placeholder="Leave blank in you dont have a website"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="">
                <div>Store Desciption</div>
                <textarea
                  onChange={this.handleChange}
                  name="storeDescription"
                  rows={5}
                  defaultValue={this.state.storeDescription}
                  className="form-control  mt-1 mb-4 col-8"
                  placeholder="e.g The official mallorar store"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-3 border-bottom pb-2 mb-5 pt-4">
              <div className="bold c-blue mb-0 h5">Store Features</div>
              <div className="">
                These are your store logo and the shop card banner for people to
                identify your store
              </div>
            </div>
            <div className="container-fluid mt-4">
              <div className="row">
                <div className="col-12 col-lg-6 h-00">
                  <div className="bold h5 c-blue">Logo</div>
                  <div className="i-t-n">
                    <img
                      src={this.state.storeLogo}
                      className=" img-thumbnail p-2"
                      alt=""
                    />
                    <div className="">
                      <button
                        id="storeLogo"
                        onClick={this.selectpicO}
                        className="ml-dash-btn t15 rounded-0 my-3 "
                      >
                        Change Logo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6 h-100 ">
                  <div className="bold h5 c-blue">
                    Featured Image <small>(Preview)</small>
                  </div>
                  <div className="r-0 card ml-store-card rounded-0 p-0 border-0 shadow">
                    <div className="s-c-p-i">
                      <img
                        className="img-fluid"
                        src={this.state.storeFeaturedImage}
                        alt=""
                      />
                    </div>
                    <div className="card-body p-3">
                      <div className="pb-2">
                        <h5 className="c-blue bold mb-0">
                          {this.state.storeName}
                        </h5>
                        <div>{this.state.storeTag}</div>
                      </div>
                      <div className="navbar py-0 px-0">
                        <div>
                          <button className="btn btn-warning py-1 rounded-0">
                            Follow
                          </button>
                        </div>
                        <div>
                          <button className="btn shadow-none p-1 btn-outline-info rounded-0 r-0 px-3">
                            Visit Store
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <button
                      onClick={this.selectpicO}
                      id="storeFeaturedImage"
                      className="ml-dash-btn rounded-0 my-3 "
                    >
                      Change Image
                    </button>
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

export default Storeinformation;
