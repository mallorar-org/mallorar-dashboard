import React from "react";
import { Link } from "react-router-dom";

export default function Department({ data }) {
  return (
    <div className="row text-left py-0 align-items-center border-bottom">
      <Link
        to={`/department/${data.id}`}
        className="col d-flex a-cancel px- p-lg-3 border-right"
      >
        <img className="cat-image" alt="" src={data.departmentImage} />
        <div className="">
          <div className="bold">{data.departmentName}</div>
          <div className="text-secondary">Slug : {data.departmentSlug}</div>
          <div className="mt-3">
            <div className="text-secondary">
              <span className="bold">Number of categories</span>
              <span className="ml-1">{data.categories_count}</span>
            </div>
            <div className="text-secondary">
              <span className="">
                A total of {data.total_products_sold} products has been sold
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="col-2 px- p-lg-3">{data.products_sold_today}</div>
      <div className="col-2 px- p-lg-3">{data.visits_today}</div>
      <div className="col-1 px- p-lg-3">*</div>
      <div className="col-2 px- p-lg-3">Active</div>
    </div>
  );
}
