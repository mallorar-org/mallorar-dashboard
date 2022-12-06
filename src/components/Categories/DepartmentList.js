import React from "react";
import Department from "./Department";

export default function CategoryList({ departments }) {
  return (
    <div className="mt-3 department-list">
      <div className="container-fluid border rounded overlow-hidden">
        <div className="row c-blue- bg-light text-left ml-table-header py-0 border-bottom">
          <div className="col d-flex px- p-lg-3 border-right">
            <span className="ml-3">Department | {departments.length}</span>
          </div>
          <div className="col-2 px- p-lg-3">Sold today</div>
          <div className="col-2 px- p-lg-3">View count</div>
          <div className="col-1 px- p-lg-3">*</div>
          <div className="col-2 px- p-lg-3">Status</div>
        </div>
        {departments.map((x) => (
          <Department data={x} key={x.id} />
        ))}
      </div>
    </div>
  );
}
