import React from "react";

export default function DepartmentPageContent({ department }) {
  return (
    <div className="mt-0 department-list">
      <div className="container-fluid border overlow-hidden">
        <div className="row c-blue- bg-light text-left ml-table-header py-0 ">
          <div className="col d-flex px- p-lg-3 border-right">
            <span className="pl-1">
              Page Content for {department.departmentName}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <section>
          <div className="bold h6 mb-0">First floor</div>
          <div className="text-secondary">
            (Optionally) Add the wide top image for this department page
          </div>
          <div className="mt-4">
            <button className="ml-dash-btn rounded-0">Upload</button>
          </div>
        </section>
      </div>
    </div>
  );
}
