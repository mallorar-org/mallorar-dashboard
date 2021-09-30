import React, { Component } from "react";
import CheckBox from "../common/CheckBox";
import { connect } from "react-redux";
import { select_image_in_selector } from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    selected_images_in_selector: state.productAR.selected_images_in_selector,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    select_image_in_selector: (n) => dispatch(select_image_in_selector(n)),
  };
};

class SelectorImage extends Component {
  state = {
    selected: false,
  };

  componentDidMount = () => {
    this.props.selected_images_in_selector.forEach((x) => {
      if (x === this.props.url) {
        return this.setState({
          selected: true,
        });
      }
    });
  };

  select_image = () => {
    this.props.select_image_in_selector(this.props.url);
    this.setState({
      selected: !this.state.selected,
    });
  };

  render() {
    return (
      <div
        className={`${this.props.className} ${
          this.state.selected && "selected "
        }  col-6 p-2 col-md-4 col-lg-3 text-center`}
      >
        <div className="border-0 p-2 m-selector-image-header d-flex justify-content-between w-100">
          <div></div>
          <div>
            <CheckBox
              id={this.props.index}
              onchange={this.select_image}
              checked={this.state.selected}
            />
          </div>
        </div>
        <img
          src={this.props.src}
          alt={this.props.alt}
          onClick={this.props.onClick}
          className={` ml-img-preview`}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorImage);
