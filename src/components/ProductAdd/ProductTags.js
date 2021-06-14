import React, { Component } from "react";

class ProductTags extends Component {
  state = {
    tags: [],
  };

  componentDidMount() {
    this.props.onRef6(this);
  }
  componentWillUnmount() {
    this.props.onRef6(undefined);
  }

  captureData = () => {
    this.props.getTags(this.state.tags);
  };

  handleTagChange = (e) => {
    let tags = e.target.value.split(",");
    this.setState({
      tags: tags,
    });
  };
  render() {
    return (
      <div className="ml-2 mt-3 card p-2 card-body ml-card-shadow">
        <h6 className="py-2 c-blue text-center bold border-bottom">
          Product Tags <small>(auto-generated)</small>
        </h6>
        <div className=" text-center">
          <div className="text-center mb-2">Provide product tags</div>
          <div className="">
            <input
              disabled
              className="form-control"
              onChange={this.handleTagChange}
              type="text"
            />
          </div>

          <div className=" mt-2">
            {this.state.tags.map((x, index) => (
              <div key={index} className="ml-p-searchtags-dash">
                {x}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductTags;
