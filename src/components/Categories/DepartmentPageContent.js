import React, { useState } from "react";
import BannerSection from "./BannerSection";
import PageContentModal from "./PageContentModal";

const DepartmentPageContent = ({ add_wide_banner, add_banner, department }) => {
  const [config, set_config] = useState({
    field: "wide_banner",
    action: "create",
  });
  const [pc_modal_open, set_pc_modal_state] = useState(false);

  const handle_create = (data) => {
    if (config.field === "wide_banner") {
      add_wide_banner(data);
    } else {
      add_banner(data);
    }
    set_pc_modal_state(false);
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
        close={() => set_pc_modal_state(false)}
        handle_create={handle_create}
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
              <BannerSection data={department.wide_banner} />
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
              <BannerSection data={x} key={index} />
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
