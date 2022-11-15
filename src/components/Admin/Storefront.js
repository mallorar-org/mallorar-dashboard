import axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../pages/loading";
import Categories from "../Admin/Categories";
import HomeSection from "../Admin/HomeSectionPart";
toast.configure();

class Storefront extends Component {
  state = {
    loading: true,
    categories: [],
    selected: "banner",
    BannerImg: "",
    SliderImg1: "",
    SliderImg2: "",
    SliderImg3: "",
    availableCategories: [],
  };
  toastNotify = (e, t) => {
    toast(e, { autoClose: false, position: "bottom-right", type: t });
  };

  componentDidMount = () => {
    axios
      .get("/dash/getstorefront")
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

  updateStoreFront = () => {
    axios
      .post("/dash/updatesf", this.state)
      .then(() => {
        document.getElementById("btnSave").innerHTML = "Save Changes";
        document.getElementById("btnSave").disabled = false;
        return this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Success</div>
            <div>Your store front has been updated successfully</div>
          </div>,
          toast.TYPE.SUCCESS,
        );
      })
      .catch(() => {
        document.getElementById("btnSave").innerHTML = "Save Changes";
        document.getElementById("btnSave").disabled = false;
        return this.toastNotify(
          <div>
            <div className="bold h6 mb-0">Error #56</div>
            <div>
              We could not update your settings, check your internet connection
            </div>
          </div>,
          toast.TYPE.ERROR,
        );
      });
  };

  getHomeBannerSlider = (d) => {
    this.setState({ ...d });
  };
  getCategoryUrls = (d) => {
    this.setState({
      categories: d,
    });
  };

  handleSave = () => {
    this.child1.captureData();
    this.child2.captureData();

    document.getElementById("btnSave").innerHTML = "Saving Changes";
    document.getElementById("btnSave").disabled = true;
    setTimeout(() => this.updateStoreFront(), 1000);
  };

  render() {
    if (this.state.loading) {
      return <Loading loader={"3"} />;
    }
    console.log(this.state);
    return (
      <div>
        <div className="navbar p-0 bg-blueish rounded p-3">
          <div className="">
            <h4 className="mb-0 bold">Store Front</h4>
            <div>Control features on your store front</div>
          </div>
          <div>
            <button
              id="btnSave"
              onClick={this.handleSave}
              className="ml-dash-btn  no-outline"
            >
              Save Changes
            </button>
          </div>
        </div>

        <HomeSection
          defaults={this.state}
          getHomeBannerSlider={this.getHomeBannerSlider}
          onRef1={(ref) => (this.child1 = ref)}
        />
        <Categories
          defaults={this.state}
          getCategoryUrls={this.getCategoryUrls}
          onRef2={(ref) => (this.child2 = ref)}
        />
        {/* <AboutUs /> */}

        {/* <div>Categories</div> */}
      </div>
    );
  }
}

export default Storefront;
