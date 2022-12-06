import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddModal from "../components/DepartmentsHome/AddModal";

export default function Department() {
  const [add_modal_open, set_add_modal_state] = useState(false);
  const [creating_d, set_creating] = useState(false);
  const [redirect, set_redirect] = useState("");
  const [activeItem, setActiveItem] = useState("1");
  const [data, setData] = useState({
    loading: false,
    departmentName: "Women's Clothing",
  });

  const handle_create = async (data) => {
    set_creating(true);

    let category = {
      departmentName: data.name,
      departmentSlug: data.slug,
      departmentImage: data.image,
    };

    try {
      let result = await axios.post("/dash/categories/add", category);
      set_creating(false);
      set_add_modal_state(false);
      console.log(result.data);
      set_redirect(result.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const toggle = (tab) => {
    if (activeItem !== tab) {
      setActiveItem(tab);
    }
  };

  const pricingTabsCss = (tab) => {
    let cssRacho;
    if (tab === activeItem) {
      cssRacho = "ml-dash-PPtab ml-dash-PPtab-active";
    } else {
      cssRacho = "ml-dash-PPtab";
    }

    return cssRacho;
  };

  return (
    <>
      <AddModal
        label="Category"
        loading={creating_d}
        handle_create={handle_create}
        close={() => set_add_modal_state(false)}
        opened={add_modal_open}
      />
      <section className="ml-container bg-white h-100">
        <div className="text-secondary">Manage department / </div>
        <h1 className="bold mb-0 ml-h c-blue">{data.departmentName}</h1>

        <div className="card mt-4 p-2 card-body ml-card-shadow">
          <div className="card-body p-2">
            <div className="mb-1 text-secondary">
              <div>
                <div>
                  Add or delete categories below and the category image aswell
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
              Create category
            </button>
            <button
              type="button"
              className="btn ml-2 px-3 py-2 border-0 rounded-0 ml-btn"
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="card mt-4 p-0 card-body ml-card-shadow">
          <div className="ml-dash-order-tab-nav mt-0 c-blue-">
            <div className="border-bottom d-flex">
              <div
                to="#"
                onClick={() => toggle("1")}
                role="tab"
                className={pricingTabsCss("1")}
              >
                Categories
              </div>

              <div
                to="#"
                onClick={() => toggle("2")}
                role="tab"
                className={pricingTabsCss("2")}
              >
                Department Page
              </div>

              <div
                to="#"
                onClick={() => toggle("3")}
                role="tab"
                className={pricingTabsCss("3")}
              >
                Brands
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
