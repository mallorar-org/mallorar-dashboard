import React from "react";

export default function DepartmentAdd() {
  return (
    <section className="ml-container bg-white h-100">
      <div className="text-secondary">Departments / </div>
      <h1 className="bold mb-0 ml-h c-blue">Add department</h1>
      <div className="card mt-4 p-2 card-body ml-card-shadow">
        <div className="card-body p-2">
          <div className="mb-1 text-secondary">
            <div>
              <div>
                Add or delete categories below and the category image aswell
              </div>
              <div>
                Creating a category or departments adds it in the system for all
                sellers and customers to add adn navigate
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 pb-2">
          <button
            type="button"
            className="btn ml-2 px-3 py-2 border-0 rounded-0 ml-btn"
          >
            Refresh
          </button>
        </div>
      </div>
    </section>
  );
}
