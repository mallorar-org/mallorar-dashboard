import { MDBModal, MDBModalBody } from "mdbreact";
import React, { Component } from "react";
import { FaStumbleupon } from "react-icons/fa";
import Variation from "./Variation";
import VariationControl from "./VariationControl";
import VariationEditControl from "./VariationEditControl";

class ProductVariations extends Component {
  state = {
    pvModalOpen: false,
    pvModalEditOpen: false,
    pvModalEditVariations: false,
    variations: [],
    variationsToDisplay: [],
    variationDafts: [],
  };

  saveVariation = (n) => {
    let cv = this.state.variations;

    let vindex = -1;

    cv.forEach((x, index) => {
      if (x.variableName === n.variableName) {
        vindex = index;
      }
    });

    if (vindex === -1) {
      cv.push(n);
    } else {
      cv[vindex] = n;
    }

    this.setState({
      variationDafts: cv,
    });
  };

  finallySaveVariations = () => {
    this.setState({
      variations: this.state.variationDafts,
      pvModalOpen: false,
    });

    this.modelizeVariations();
  };

  componentDidMount = () => {
    this.modelizeVariations();
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);

    if (prevState.variations !== this.state.variations) {
      this.modelizeVariations();
      // console.log("safe to run !");
    }
  }

  modelizeVariations = () => {
    let variations = this.state.variations;
    let pVar = [];

    if (variations.length === 0) return;

    variations[0].variableValues.forEach((v) => {
      let position = 0;
      position += 1;

      if (!v.priceDiff) {
      }

      // with different price
      if (variations.length > position) {
        variations[position].variableValues.forEach((otherV) => {
          let tempVaval = [];
          tempVaval.push(v.variationValue);
          tempVaval.push(otherV.variationValue);
          pVar.push(tempVaval);
        });
      } else {
        let tempVaval = [];
        tempVaval.push(v.variationValue);
        pVar.push(tempVaval);
      }
    });

    this.setState({
      variationsToDisplay: pVar,
    });
    // console.log(pVar);
  };

  pvModal = () => {
    return (
      <MDBModal
        size="lg"
        isOpen={this.state.pvModalOpen}
        toggle={() => this.setState({ pvModalOpen: !this.state.pvModalOpen })}
      >
        <MDBModalBody className="p-0">
          <div
            style={{ minHeight: "32rem" }}
            className="ml-container py-2 px-1"
          >
            <div className="d-flex px-3  justify-content-between">
              <div className=" h4 mb-0 d-flex align-items-center">
                {/* <img alt="" className="ml-icon-size1 mr-2" src={skills} /> */}
                <div>
                  <div className="bold">Add variations</div>
                  <div className="t14">
                    List all product options you have for this item.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  this.setState({ pvModalOpen: !this.state.pvModalOpen })
                }
                className="bold i-i-btn btn cp h3 mb-0"
              >
                &times;
              </button>
            </div>
            <div className="mt-2 border-top">
              <div>
                <div className="ml-dash-tab-header-APP nav-tabs px-3 py-2  bg-white d-flex">
                  <div to="#" role="tab">
                    Create Variation
                  </div>
                </div>
              </div>
              <div className="px-2 ">
                <VariationControl
                  saveVariation={(n) => this.saveVariation(n)}
                  key="v1"
                />

                {this.state.variationDafts.length >= 1 && (
                  <>
                    <VariationControl
                      saveVariation={(n) => this.saveVariation(n)}
                      key="v2"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="p-3">
              <button
                onClick={this.finallySaveVariations}
                className="btn ml-btn"
              >
                Save Variation(s)
              </button>
            </div>
          </div>
        </MDBModalBody>
      </MDBModal>
    );
  };
  pvModalEditVariations = () => {
    return (
      <MDBModal
        size="lg"
        isOpen={this.state.pvModalEditVariations}
        toggle={() =>
          this.setState({
            pvModalEditVariations: !this.state.pvModalEditVariations,
          })
        }
      >
        <MDBModalBody className="p-0">
          <div
            style={{ minHeight: "32rem" }}
            className="ml-container py-2 px-1"
          >
            <div className="d-flex px-3  justify-content-between">
              <div className=" h4 mb-0 d-flex align-items-center">
                {/* <img alt="" className="ml-icon-size1 mr-2" src={skills} /> */}
                <div>
                  <div className="bold">Edit variations</div>
                  <div className="t14">
                    List all product options you have for this item.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  this.setState({
                    pvModalEditVariations: !this.state.pvModalEditVariations,
                  })
                }
                className="bold i-i-btn btn cp h3 mb-0"
              >
                &times;
              </button>
            </div>
            <div className="mt-2 border-top">
              <div>
                <div className="ml-dash-tab-header-APP nav-tabs px-3 py-2  bg-white d-flex">
                  <div to="#" role="tab">
                    Create Variation
                  </div>
                </div>
              </div>
              <div className="px-0 ">
                {this.state.variations.map((x, index) => (
                  <VariationEditControl
                    x={x}
                    saveVariation={(n) => this.saveVariation(n)}
                    key={`v` + index}
                  />
                ))}
              </div>
            </div>
            <div className="p-3">
              <button
                onClick={this.finallySaveVariations}
                className="btn ml-btn"
              >
                Save Variation(s)
              </button>
            </div>
          </div>
        </MDBModalBody>
      </MDBModal>
    );
  };

  render() {
    console.log("==>", this.state);
    return (
      <div>
        {this.pvModal()}
        {this.pvModalEditVariations()}
        <div className="ml-card-shadow mt-4">
          <div className="card-body">
            <div className="h5 bold ">
              <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
                <FaStumbleupon className="ml-icon-size1 mr-2" />
                <span className="bold c-blue">Product Variations</span>
              </h5>
            </div>
            <div className="">
              Add product variation options like color or size. Customers will
              choose from these before adding products to cart.
            </div>
            <div className="my-3 pb-2">
              {this.state.variations.length === 0 && (
                <button
                  onClick={() =>
                    this.setState({ pvModalOpen: !this.props.pvModalOpen })
                  }
                  type="button"
                  className="ml-btn"
                >
                  Add Variation(s)
                </button>
              )}
              {this.state.variations.length > 0 && (
                <button
                  onClick={() => this.setState({ pvModalEditVariations: true })}
                  type="button"
                  className="ml-0 ml-btn"
                >
                  Edit Variations(s)
                </button>
              )}
            </div>

            {this.state.variations.length > 0 && (
              <div className="mt-2 border rounded">
                <div className="container-fluid">
                  <div className="row shadow-sm text-center bold">
                    {this.state.variations.map((x) => (
                      <div className="col-2 p-2 border-right">
                        {x.variableName}
                      </div>
                    ))}

                    <div className="col-3 p-2">Price</div>
                    {/* <div className="col-3 p-2">Stock</div> */}
                  </div>

                  {this.state.variationsToDisplay.map((x, index) => (
                    <Variation key={index} x={x} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductVariations;
