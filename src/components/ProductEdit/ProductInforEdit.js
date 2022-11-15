import React, { Component } from "react";
import RTE from "../MallorarRichTextEditor/MallorarRichTextEditor";

class ProductInfor extends Component {
  state = {
    productSlugPreview: "",
    productSlug: "",
    productName: "",
  };

  componentDidMount() {
    this.props.onRef1(this);
    document
      .getElementById("formDetails")
      .addEventListener("submit", function (event) {
        event.preventDefault();
      });
    this.setState({
      productSlugPreview: this.props.data.productSlug,
    });
  }
  componentWillUnmount() {
    this.props.onRef1(undefined);
  }

  submitForm = () => {
    // document.getElementById("formDetails").addEventListener("submit", function(event){
    //   event.preventDefault()
    // });

    document.getElementById("btninfoSubmit").click();
  };

  handleSubmit = (e) => {
    let productName = document.getElementById("productName").value;
    let productSD1 = document.getElementById("productSD1").value;
    let productSD2 = document.getElementById("productSD2").value;
    let productSD3 = document.getElementById("productSD3").value;
    let productSD4 = document.getElementById("productSD4").value;
    let productSD5 = document.getElementById("productSD5").value;
    let productDescription = this.state.descrption;

    if (!productName) {
      productName = "default";
    }
    if (!productSD1) {
      productSD1 = "default";
    }
    if (!productSD2) {
      productSD2 = "default";
    }
    if (!productSD3) {
      productSD3 = "default";
    }
    if (!productSD4) {
      productSD4 = "default";
    }
    if (!productSD5) {
      productSD5 = "default";
    }
    if (!productDescription) {
      productDescription = "default";
    }

    let ProductInfor = {
      productName: productName,
      productSD1: productSD1,
      productSD2: productSD2,
      productSD3: productSD3,
      productSD4: productSD4,
      productSD5: productSD5,
      productDescription: productDescription,
      productSlug: this.state.productSlug,
    };

    // console.log(ProductInfor)

    this.props.getPinfor(ProductInfor);
  };

  captureData() {
    this.handleSubmit();
  }

  slugPreview = () => {
    return (
      <span>
        {`https://mallorar.com/p/MP000/${this.state.productSlugPreview}`}
      </span>
    );
  };

  pnChange = (e) => {
    let value = e.target.value.replace(/ /g, "-").toLowerCase();
    this.setState({
      productSlugPreview: value,
      productSlug: value,
      productName: e.target.value,
    });
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} id="formDetails">
          <div className="card card-body ml-shadow card-block mr-2">
            <h5 className="c-blue border-bottom pb-2">
              <span className=" bold b-border c-blue">Product Name</span>
            </h5>
            <div className="">
              <div className="mt-3">
                <input
                  required
                  type="text"
                  defaultValue={this.props.data.productName}
                  onChange={this.pnChange}
                  id="productName"
                  placeholder="..."
                  className="form-control mb-2"
                />
                <label> Permalink Preview: {this.slugPreview()}</label>
              </div>
            </div>
          </div>
          <div className="mt-3 mr-2 card card-body ml-card-shadow">
            <h5 className="c-blue border-bottom pb-2">
              <span className=" bold b-border c-blue">Short Description</span>
            </h5>
            <div className="">
              <div className="mt-3 form-group">
                <div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      1).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        onChange={this.onChangeFM}
                        defaultValue={
                          this.props.data.productSD1 === "default"
                            ? ""
                            : this.props.data.productSD1
                        }
                        id="productSD1"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      2).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        defaultValue={
                          this.props.data.productSD2 === "default"
                            ? ""
                            : this.props.data.productSD2
                        }
                        onChange={this.onChangeFM}
                        id="productSD2"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      3).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        onChange={this.onChangeFM}
                        defaultValue={
                          this.props.data.productSD3 === "default"
                            ? ""
                            : this.props.data.productSD3
                        }
                        id="productSD3"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      4).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        onChange={this.onChangeFM}
                        defaultValue={
                          this.props.data.productSD4 === "default"
                            ? ""
                            : this.props.data.productSD4
                        }
                        id="productSD4"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row form-group">
                    <div className="col col-md-1 d-flex align-items-center">
                      5).
                    </div>
                    <div class="col-12 col-md-8">
                      <input
                        type="text"
                        onChange={this.onChangeFM}
                        defaultValue={
                          this.props.data.productSD5 === "default"
                            ? ""
                            : this.props.data.productSD5
                        }
                        id="productSD5"
                        placeholder="Add Point"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card ml-card-shadow card-body mt-3 mr-2">
            <h5 className="c-blue border-botto pb-2">
              <span className=" bold c-blue">Description</span>
            </h5>
            <div className="border rounded">
              <RTE
                initial={
                  this.props.data.productDescription === "default"
                    ? ""
                    : this.props.data.productDescription
                }
                ohtml={(n) => this.setState({ descrption: `${n}` })}
                type={"description"}
                placeholder="Detailed Description.."
              />
            </div>
          </div>
          <input id="btninfoSubmit" hidden type="submit" />
        </form>
      </React.Fragment>
    );
  }
}

export default ProductInfor;
