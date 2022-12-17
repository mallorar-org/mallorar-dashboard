import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryList from "../components/Categories/CategoryList";
import DepartmentPageContent from "../components/Categories/DepartmentPageContent";
import AddModal from "../components/DepartmentsHome/AddModal";
import Loading from "../pages/loading";

export default function Department() {
  const params = useParams();
  const [add_modal_open, set_add_modal_state] = useState(false);
  const [creating_d, set_creating] = useState(false);
  const [activeItem, setActiveItem] = useState("1");

  const [dep_data, setData] = useState({
    loading: true,
    departmentName: "",
    id: "",
    categories: [],
  });

  useEffect(() => {
    let dep_id = params.id;

    get_department();

    console.log({ dep_id });
  }, []);

  const get_department = async () => {
    try {
      let res = await axios.get(`/dash/department/${params.id}`);
      setData({
        ...dep_data,
        ...res.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handle_create = async (data) => {
    set_creating(true);

    let category = {
      categoryName: data.name,
      categorySlug: data.slug,
      categoryImage: data.image,
      departmentID: dep_data.id,
    };

    try {
      let result = await axios.post("/dash/categories/add", category);
      set_creating(false);
      set_add_modal_state(false);
      console.log(result.data);
      let current_cats = dep_data.categories;
      current_cats.push({
        ...result.data,
      });
      setData({
        ...dep_data,
        categories: current_cats,
      });
      // set_redirect(result.data.id);
    } catch (err) {
      set_creating(false);
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

  const add_wide_banner = (data) => {
    let dep = dep_data;
    dep.wide_banner = data;
    setData({
      ...dep_data,
      ...dep,
    });
  };
  const remove_wide_banner = () => {
    let dep = dep_data;
    dep.wide_banner = "";
    setData({
      ...dep_data,
      ...dep,
    });
  };

  const add_banner = (data) => {
    let dep = dep_data;
    let current_banners = dep.banners;
    current_banners.push(data);
    dep.banners = current_banners;
    setData({
      ...dep_data,
      ...dep,
    });
  };
  const remove_banner = (id) => {
    let dep = dep_data;
    let current_banners = dep.banners;
    let filtered_banners = [];

    current_banners.forEach((x) => {
      if (x.id !== id) {
        filtered_banners.push(x);
      }
    });

    dep.banners = filtered_banners;
    setData({
      ...dep_data,
      ...dep,
    });
  };

  const switch_tab = () => {
    switch (activeItem) {
      case "1":
        return <CategoryList categories={dep_data.categories} />;
      case "2":
        return (
          <DepartmentPageContent
            remove_wide_banner={remove_wide_banner}
            remove_banner={remove_banner}
            add_wide_banner={(e) => add_wide_banner(e)}
            add_banner={(e) => add_banner(e)}
            department={dep_data}
          />
        );
      default:
        return null;
    }
  };

  if (dep_data.loading) {
    return <Loading />;
  }

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
        <h1 className="bold mb-0 ml-h c-blue">{dep_data.departmentName}</h1>

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
          <div className="">{switch_tab()}</div>
        </div>
      </section>
    </>
  );
}
