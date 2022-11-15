import React from "react";
import { Link } from "react-router-dom";

export default function Department() {
  return (
    <div className="row text-left py-0 align-items-center border-bottom">
      <Link
        to="/categories/womens"
        className="col d-flex a-cancel px- p-lg-3 border-right"
      >
        <img
          className="cat-image"
          alt=""
          src="https://cf.shopee.com.my/file/7ea3e07f2e6f57272c6641e4ce3f1632_tn"
        />
        <div className="">
          <div className="bold">Womens Clothes</div>
          <div className="text-secondary">Slug : womens-clothes</div>
          <div className="mt-3">
            <div className="text-secondary">
              <span className="bold">Number of categories</span>
              <span className="ml-1">43</span>
            </div>
            <div className="text-secondary">
              <span className="">A total of 24 products has been sold</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="col-1 px- p-lg-3">#432</div>
      <div className="col-2 px- p-lg-3">34k</div>
      <div className="col-2 px- p-lg-3">34k</div>
      <div className="col-1 px- p-lg-3">*</div>
      <div className="col-2 px- p-lg-3">Active</div>
    </div>
  );
}
