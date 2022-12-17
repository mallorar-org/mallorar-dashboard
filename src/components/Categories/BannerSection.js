import React from "react";

export default function BannerSection({ data, type, remove_banner }) {
  return (
    <div className="mt-3">
      <div className="mb-3 p-3 border rounded">
        <div className="container-fluid">
          <div className="row">
            <div
              className={`col-6 ${
                !data.banner
                  ? "d-flex align-items-center justify-content-center"
                  : ""
              } `}
            >
              {data.banner ? (
                <img alt="" className="img-fluid" src={data.banner} />
              ) : (
                <div className="text-center">no banner image selected</div>
              )}
            </div>
            <div className="col-6 border-left">
              <div className="border-bottom">
                <div className="d-flex justify-content-between align-items-center pb-2">
                  <h6 className="bold text-secondary mb-0">Banner content</h6>
                  <button className="ml-dash-btn py-1">Edit</button>
                </div>
              </div>
              <div className="py-2">
                <div className="text-secondary t14">Promotional text</div>
                <div className="border rounded p-2 mt-1">
                  <div className="bold">{data.heading}</div>
                  {data.p_text ? (
                    <div className="text-secondary">{data.p_text}</div>
                  ) : null}
                </div>
                <div className="mt-2 px-1">
                  {data.bg_color ? (
                    <div className="d-flex mt-3 align-items-center">
                      <div className="bold">Background color</div>
                      <div
                        style={{
                          backgroundColor: data.bg_color,
                        }}
                        className="text-small w-25 border bg-gray p-3 ml-3"
                      ></div>
                    </div>
                  ) : null}

                  {data.btn_text ? (
                    <>
                      <div className="d-flex mt-2 align-items-center">
                        <div className="bold">Button color</div>
                        <div
                          style={{
                            backgroundColor: data.btn_bg_color,
                          }}
                          className="text-small w-25 border bg-gray p-3 ml-3"
                        ></div>
                      </div>
                      <div className="d-flex mt-2 align-items-center">
                        <div className="bold">Button text color</div>
                        <div
                          style={{
                            backgroundColor: data.btn_text_color,
                          }}
                          className="text-small w-25 border bg-gray p-3 ml-3"
                        ></div>
                      </div>
                      <div className="d-flex mt-2 align-items-center">
                        <div className="bold">Button border color</div>
                        <div
                          style={{
                            backgroundColor: data.btn_border_color,
                          }}
                          className="text-small w-25 border bg-gray p-3 ml-3"
                        ></div>
                      </div>
                      <div className="d-flex mt-2 align-items-center">
                        <div>Button preview - </div>
                        <div>
                          <div
                            style={{
                              background: data.btn_bg_color,
                              color: data.btn_text_color,
                              border: `2px solid ${data.btn_border_color}`,
                            }}
                            className="ml-btn ml-2 rounded-0"
                          >
                            {data.btn_text}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {data.link_to ? (
                    <div className="d-flex mt-3 align-items-center">
                      <div className="text-small bg-gray p-2 px-3">
                        <div className="bold">Route click to</div>
                        {data.link_to}
                      </div>
                    </div>
                  ) : null}

                  <div className="pt-3">
                    <span className="bold cp">Move down</span>
                    <span className="px-2">|</span>
                    <span
                      onClick={() => remove_banner(type, data.id)}
                      className="bold cp"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
