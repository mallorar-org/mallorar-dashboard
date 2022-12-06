import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import DepartmentList from "../components/Categories/DepartmentList";
import AddModal from "../components/DepartmentsHome/AddModal";
import Loading from "../pages/loading";

export default function DepartmentsHome() {
  const [add_modal_open, set_add_modal_state] = useState(false);
  const [creating_d, set_creating] = useState(false);
  const [redirect, set_redirect] = useState("");
  const [data, setData] = useState({
    loading: true,
    departments: [],
  });

  useEffect(() => {
    get_departments();
  }, []);

  const get_departments = async () => {
    try {
      let res = await axios.get("/dash/departments/get");
      setData({
        loading: false,
        departments: res.data.departments,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handle_create = async (data) => {
    set_creating(true);

    let department = {
      departmentName: data.name,
      departmentSlug: data.slug,
      departmentImage: data.image,
    };

    try {
      let result = await axios.post("/dash/departments/add", department);
      set_creating(false);
      set_add_modal_state(false);
      console.log(result.data);
      set_redirect(result.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Redirect to={`/departments/${redirect}`} />;
  }

  if (data.loading) {
    return <Loading />;
  }

  return (
    <>
      <AddModal
        loading={creating_d}
        handle_create={handle_create}
        close={() => set_add_modal_state(false)}
        opened={add_modal_open}
      />
      <section className="ml-container bg-white h-100">
        <div className="text-secondary">Departments / </div>
        <h1 className="bold mb-0 ml-h c-blue">Manage Departments</h1>
        <div className="card mt-4 p-2 card-body ml-card-shadow">
          <div className="card-body p-2">
            <div className="mb-1 text-secondary">
              <div>
                <div>
                  Add or delete categories below and the category image aswell
                </div>
                <div>
                  Creating a category or departments adds it in the system for
                  all sellers and customers to add adn navigate
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 pb-2">
            <button
              onClick={() => set_add_modal_state(true)}
              type="button"
              className="btn px-3 py-2 ml-dash-btn"
            >
              Add Department
            </button>
            <button
              type="button"
              className="btn ml-2 px-3 py-2 border-0 rounded-0 ml-btn"
            >
              Refresh
            </button>
          </div>
        </div>
        <DepartmentList departments={data.departments} />
      </section>
    </>
  );
}
