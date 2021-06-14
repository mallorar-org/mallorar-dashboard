import React, { Component } from "react";
import img from "../../../assets/images/hair.jpg";

class ProductOrders extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="d-flex w-100 px-2 justify-content-between ml-product-row mb-0 p-1 align-items-center">
          <div className="d-flex">
            <div>
              <img className="img-fluid ml-img-thumpnail" src={img} alt="" />
            </div>
            <div className="pl-2 align-items-center d-flex mb-0">
              <div>
                <div className="bold">Nike airforce 1</div>
                <div className="t13 text-secondary">#PD23421</div>
              </div>
              <div>
                <span className="alert border-0 small alert-success bold ml-2 px-1 py-0">
                  Poor Product
                </span>
              </div>
            </div>
          </div>
          <div className="text-center small">
            Rating{" "}
            <div className="text-success bold small">
              + {Math.round(Math.random() * 10)}.0
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductOrders;
