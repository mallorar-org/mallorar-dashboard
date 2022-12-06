import axios from "axios";
import React, { Component } from "react";
import Loader from "../../pages/loading";
import { smoothenizename } from "../../util/smoothenizeurlname";
import icons from "../common/icons";

class ShowFiles extends Component {
  state = {
    loading: true,
    images: [],
    selected: "",
  };
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  runCall = () => {
    axios.get("/dash/getstorefiles?type=document").then((data) => {
      this.setState({
        images: data.data,
        loading: false,
      });
    });
  };

  componentDidMount = () => {
    this.props.onRef(this);
    axios
      .get("/dash/getstorefiles?type=document")
      .then((data) => {
        // console.log(data.data);
        this.setState({
          images: data.data,
          loading: false,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  selectfile = (n, x) => {
    console.log(x);
    this.setState({
      selected: n,
    });

    this.props.selected(x);
  };

  cssRacho = (n) => {
    if (this.state.selected === n) {
      return "ml-img-preview_a";
    } else {
      return "";
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    console.log(this.state);
    return (
      <div className="container-fluid  ml-modal-left-drawer py-2">
        {this.state.images.map((x, index) => (
          <div
            className={`${this.cssRacho(index)} cp row border-top`}
            onClick={() => this.selectfile(index, x)}
            key={index}
          >
            <div className="col-2 p-2">
              <img
                alt=""
                src={icons.solid.pdf.blue}
                className="ml-icon-size1"
              />
            </div>
            <div className="col-10 d-flex align-items-center p-2 text-left">
              {smoothenizename(x.filename)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ShowFiles;
