import React, { Component } from "react";
import FileSelector from "../../components/FileSelector/FileSelector";

class HomeSectionPart extends Component {
  state = {
    nothingSelected: true,
    fileselector: false,
    selected: "banner",
    BannerImg:
      "https://pnp-hybris-media-prod.s3-eu-west-1.amazonaws.com/media/2020/New+Homepage+2/header/Fathers_Day_OLS_Homepage_Banner_01.jpg",

    SliderImgs: [{
      title: 'Slider One',
      SliderImg: "https://pnp-hybris-media-prod.s3-eu-west-1.amazonaws.com/media/2020/New+Homepage+2/header/Fathers_Day_OLS_Homepage_Banner_01.jpg",
    }, {
      title: 'Slider Two',
      SliderImg: "https://pnp-hybris-media-prod.s3-eu-west-1.amazonaws.com/media/2020/New+Homepage+2/header/Fathers_Day_OLS_Homepage_Banner_01.jpg",
    }, {
      title: 'Slider Three',
      SliderImg: "https://pnp-hybris-media-prod.s3-eu-west-1.amazonaws.com/media/2020/New+Homepage+2/header/Fathers_Day_OLS_Homepage_Banner_01.jpg",
    }]
  };

  selectpicO = e => this.setState({ fileselector: true, target: e.target.id, });

  fileUrl = url => this.setState({ [this.state.target]: url });

  FileSelector = () => this.state.fileselector ? <FileSelector url={(x) => this.fileUrl(x)} close={() => this.setState({ fileselector: false })} /> : undefined;

  componentDidMount() {
    this.props.onRef1(this)
    this.setState({ ...this.props.defaults })
  }
  componentWillUnmount() {
    this.props.onRef1(undefined)
  }

  captureData = () => this.props.getHomeBannerSlider(this.state);

  slider = () => {
    return (
      <>
        <div className="container-fluid p-0 mt-3">
          <div className="row">
            {this.state.SliderImgs.map((card, i) => (
              <div className="col-12 mb-3 col-md-4" key={i}>
                <div className="card">
                  <div className="card-header">{card.title}</div>
                  <div className="card-body">
                    <img className="img-fluid" src={card.SliderImg} alt="" />
                  </div>
                  <div className="card-footer">
                    <button onClick={this.selectpicO} id="SliderImg1" className="ml-dash-btn">Change Image</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  banner = () => {
    return (
      <div className="container-fluid p-0 mt-3">
        <div className="row">
          <div className="col-md-8 col-12 border p-3">
            <img className="img-fluid" src={this.state.BannerImg} alt="" />
          </div>
          <div className="col-md-4 col-12 border p-3 d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <button id="BannerImg" onClick={this.selectpicO} className="btn shadow-none btn-info px-3 bold r-0  mr-2">Change Image</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderComponent = () => {
    if (this.state.selected === "slider") {
      return this.slider();
    }
    if (this.state.selected === "banner") {
      return this.banner();
    }
  };

  render() {
    return (
      <div className="mt-3 p-3">
        <div className="d-flex justify-content-between">
          {this.FileSelector()}
          <div>
            <h6 className="mb-0 bold">{this.state.selected === "banner" ? 'Home Banner' : 'Slider Section'}</h6>
            <div>Please select what you want to display on this section</div>
          </div>
          <div>
            <button id="btnSwitchBack" onClick={() => this.setState({ selected: this.state.selected === "slider" ? 'banner' : "slider" })} className="ml-dash-btn no-outline">
              Switch Feature
              </button>
          </div>
        </div>
        {this.renderComponent()}
      </div>
    );
  }
}

export default HomeSectionPart;
