import React, { Component } from "react";
// import axios from "axios";
import img from "../assets/images/settings.svg";

class OverView extends Component {
  state = {
    products: null,
    loader: true
  };

  // componentDidMount() {
  //   axios
  //     .get("/top")
  //     .then(res => {
  //       // console.log(res.status);
  //       //   this.setState({products : res.data });
  //       //   this.setState({loader : false});
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       // this.setState({loader : false});
  //     });
  // }

  render() {
    return (
      <div className="ml-background">
        <section className="container-fluid py-5">
          <div className="row px-3">
            <div className="col-md-3 px-2 ">
              <div className="ml-dash-icon bg-white d-flex rounded border">
                <div className="bg-danger p-4 d-flex ml-dash-banner-item justify-content-center align-items-center rounded-left">
                  <img alt="" src={img} className="img-fluid" />
                </div>
                <div>
                  <h4 className="font-weight-normal ml-3 text-secondary">Sales</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3 px-2">
              <div className="ml-dash-icon bg-white d-flex">
                <div className="bg-warning p-4 d-flex ml-dash-banner-item justify-content-center align-items-center">
                  <img alt="" src={img} className="img-fluid" />
                </div>
                <div>
                  <h4 className="font-weight-normal ml-3 text-secondary">Sales</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3 px-2">
              <div className="ml-dash-icon bg-white d-flex">
                <div className="bg-info p-4 d-flex ml-dash-banner-item justify-content-center align-items-center">
                  <img alt="" src={img} className="img-fluid" />
                </div>
                <div>
                  <h4 className="font-weight-normal ml-3 text-secondary">Subscribers</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3 px-2">
              <div className="ml-dash-icon bg-white d-flex">
                <div className="bg-primary p-4 d-flex ml-dash-banner-item justify-content-center align-items-center">
                  <img alt="" src={img} className="img-fluid" />
                </div>
                <div>
                  <h4 className="font-weight-normal ml-3 text-secondary">Likes</h4>
                </div>
              </div>
            </div>


          </div>
        </section>
      </div>
    );
  }
}

export default OverView;
