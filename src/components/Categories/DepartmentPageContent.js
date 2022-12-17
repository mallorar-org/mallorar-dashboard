import React, { useState } from "react";
import { v4 } from "uuid";
import BannerSection from "./BannerSection";
import PageContentModal from "./PageContentModal";

const DepartmentPageContent = ({
  add_wide_banner,
  add_banner,
  update_wide_banner,
  update_banner,
  department,
  remove_wide_banner,
  remove_banner,
  move_down,
}) => {
  const [config, set_config] = useState({
    field: "wide_banner",
    action: "create",
    data: null,
  });
  const [pc_modal_open, set_pc_modal_state] = useState(false);

  const initiate_edit = (type, id) => {
    let field = type === "banner" ? "banner" : "wide_banner";
    let banner_data = null;

    department.banners.forEach((x) => {
      if (x.id === id) {
        banner_data = x;
      }
    });

    set_config({
      ...config,
      field: field,
      action: "update",
      data: banner_data,
    });
    set_pc_modal_state(true);
  };

  const handle_create = (data) => {
    let new_id = v4();
    let banner = { ...data, id: new_id };
    if (config.field === "wide_banner") {
      add_wide_banner(banner);
    } else {
      add_banner(banner);
    }
    set_pc_modal_state(false);
  };
  const handle_update = (data) => {
    let banner = data;
    if (config.field === "wide_banner") {
      update_wide_banner(banner);
    } else {
      update_banner(banner);
    }
    set_pc_modal_state(false);
  };

  const handle_remove_banner = (type, id) => {
    if (type === "wide_banner") {
      remove_wide_banner();
    } else {
      remove_banner(id);
    }
  };

  const open_config_wide_banner = () => {
    set_config({
      ...config,
      field: "wide_banner",
      action: "create",
    });
    set_pc_modal_state(true);
  };
  const open_config_banner = () => {
    set_config({
      ...config,
      field: "banner",
      action: "create",
    });
    set_pc_modal_state(true);
  };

  return (
    <>
      <PageContentModal
        config={config}
        opened={pc_modal_open}
        close={() => {
          set_pc_modal_state(false);
          set_config({
            ...config,
            data: null,
          });
        }}
        handle_create={handle_create}
        handle_update={handle_update}
      />
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
            <div className="bold h6 mb-0">First floor | Page identity</div>
            <div className="text-secondary">
              (Optionally) Add the wide top image for this department page.
              Banner text for this section can also be used as title for the
              page
            </div>
            {department.wide_banner !== "" ? (
              <BannerSection
                remove_banner={handle_remove_banner}
                type="wide_banner"
                data={department.wide_banner}
                initiate_edit={initiate_edit}
              />
            ) : null}
            {department.wide_banner === "" ? (
              <div className="mt-3">
                <button
                  onClick={open_config_wide_banner}
                  className="ml-btn rounded-0"
                >
                  Upload
                </button>
              </div>
            ) : null}
          </section>
          <section className="mt-3">
            <div className="bold h6 mb-0">Banners</div>
            <div className="text-secondary">
              (Optionally) Add banners for the department section and optinaly
              link them to somewhere else
            </div>
            {department.banners.map((x, index) => (
              <BannerSection
                move_down={move_down}
                remove_banner={handle_remove_banner}
                type="banner"
                data={x}
                disable_move_down={department.banners.length === index + 1}
                key={x.id}
                initiate_edit={initiate_edit}
              />
            ))}
            {department.banners.length < 3 ? (
              <button
                onClick={open_config_banner}
                className="ml-btn mt-2 mr-3 rounded-0"
              >
                Create banner
              </button>
            ) : null}
            <button
              onClick={open_config_banner}
              className="ml-dash-btn mt-2 rounded-0"
            >
              Save changes
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default DepartmentPageContent;
