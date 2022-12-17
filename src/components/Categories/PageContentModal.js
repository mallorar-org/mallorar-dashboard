import React, { useEffect, useState } from "react";
import { MDBModal, MDBModalBody } from "mdbreact";
import textToSlug from "../../util/textToSlug";
import PlaceHolderImage from "../../assets/images/addpicture.svg";
import FileSelector from "../FileSelector/FileSelector";

const PageContentModal = ({
  opened,
  close,
  label = "Banner",
  subText = "Create or manage a banner for this product category/department",
  loading,
  handle_create,
  config,
}) => {
  const [data, setData] = useState({
    banner: "",
    heading: "",
    p_text: "",
    bg_color: "",
    btn_bg_color: "",
    btn_text_color: "",
    btn_border_color: "",
    btn_text: "",
    link_to: "",
  });

  const [selectorOpen, selectorState] = useState(false);

  useEffect(() => {
    setData({
      banner: "",
      heading: "",
      p_text: "",
      bg_color: "",
      btn_bg_color: "",
      btn_text_color: "",
      btn_border_color: "",
      btn_text: "",
      link_to: "",
    });
  }, [opened]);

  const handleTextChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    if (loading) return;
    if (!data.banner) {
      return alert("Please select a banner image first");
    }
    if (!data.bg_color) {
      return alert("Please provide a background color");
    }
    handle_create(data);
  };

  return (
    <MDBModal overflowScroll toggle={close} size="lg" isOpen={opened}>
      <MDBModalBody className="py-5">
        <div className="text-center h4 mt-3 bold">
          {config.action === "create" ? "Create" : "Update"} {label}
        </div>
        <div className="text-center mb-3">{subText}</div>
        <div className="card border mb-3 card-body">
          <div className="d-flex justify-content-center">
            <ImageSection
              open={selectorOpen}
              closeSelector={() => selectorState(false)}
              setimage={(img) => {
                setData({
                  ...data,
                  banner: img,
                });
              }}
              image={data.banner}
            />
          </div>

          <div className="text-center mt-3">
            <p>Make sure you're setting a banner that fits</p>
            <button onClick={() => selectorState(true)} className="btn ml-btn">
              Add/Replace Image
            </button>
          </div>

          <div>
            <section className="mb-2">
              <div className="mb-2 text-secondary">Banner big text</div>
              <input
                onChange={handleTextChange}
                type="text"
                className="w-100 form-control"
                placeholder=""
                name="heading"
              />
            </section>
            <section className="mb-2">
              <div className="mb-2 text-secondary">Banner p text</div>
              <input
                onChange={handleTextChange}
                type="text"
                className="w-100 form-control"
                placeholder=""
                name="p_text"
              />
            </section>

            <section className="mb-2">
              <div className="mb-2 text-secondary">Link to</div>
              <input
                onChange={handleTextChange}
                type="text"
                className="w-100 form-control"
                placeholder=""
                name="link_to"
              />
            </section>
            <section className="mb-2">
              <div className="mb-2 text-secondary">Button text</div>
              <input
                onChange={handleTextChange}
                type="text"
                className="w-100 form-control"
                placeholder=""
                name="btn_text"
              />
            </section>
            {data.btn_text !== "" ? (
              <section className="mb-2">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-5 pl-0">
                      <div className="mb-2 text-secondary">
                        Background color
                      </div>
                      <input
                        onChange={handleTextChange}
                        type="text"
                        className="w-100 form-control"
                        placeholder=""
                        name="bg_color"
                      />
                    </div>
                    <div className="col-1 pl-0">
                      <div className="mb-2 text-secondary">-</div>
                      <div
                        className="w-100 form-control"
                        placeholder=""
                        style={{
                          background: data.bg_color,
                        }}
                      />
                    </div>
                    <div className="col-5 pr-0 pl-0">
                      <div className="mb-2 text-secondary">Button color</div>
                      <input
                        onChange={handleTextChange}
                        type="text"
                        className="w-100 form-control"
                        placeholder=""
                        name="btn_bg_color"
                      />
                    </div>
                    <div className="col-1 pr-0">
                      <div className="mb-2 text-secondary">-</div>
                      <div
                        className="w-100 form-control"
                        placeholder=""
                        style={{
                          background: data.btn_bg_color,
                        }}
                      />
                    </div>
                    <div className="col-12 py-2"></div>
                    <div className="col-5 pl-0">
                      <div className="mb-2 text-secondary">
                        Button text color
                      </div>
                      <input
                        onChange={handleTextChange}
                        type="text"
                        className="w-100 form-control"
                        placeholder=""
                        name="btn_text_color"
                      />
                    </div>
                    <div className="col-1 pl-0">
                      <div className="mb-2 text-secondary">-</div>
                      <div
                        className="w-100 form-control"
                        placeholder=""
                        style={{
                          background: data.btn_text_color,
                        }}
                      />
                    </div>
                    <div className="col-5 pr-0 pl-0">
                      <div className="mb-2 text-secondary">
                        Button border color
                      </div>
                      <input
                        onChange={handleTextChange}
                        type="text"
                        className="w-100 form-control"
                        placeholder=""
                        name="btn_border_color"
                      />
                    </div>
                    <div className="col-1 pr-0">
                      <div className="mb-2 text-secondary">-</div>
                      <div
                        className="w-100 form-control"
                        placeholder=""
                        style={{
                          background: data.btn_border_color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-8 mb-4">
              <button onClick={handleCreate} className="w-100 btn ml-dash-btn">
                {loading ? (
                  "Working"
                ) : (
                  <>
                    {" "}
                    {config.action === "create" ? "Create" : "Update"}{" "}
                    {label.toLowerCase()}
                  </>
                )}
              </button>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <button onClick={close} className="w-100 btn ml-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
};

const ImageSection = ({ image, setimage, closeSelector, open }) => {
  return (
    <>
      {open ? (
        <FileSelector url={(x) => setimage(x)} close={() => closeSelector()} />
      ) : null}
      <div className="border p-2 ml-banner-image-container d-flex align-items-center justify-content-center">
        <img
          className="img-flui"
          src={image ? image : PlaceHolderImage}
          alt=""
        />
      </div>
    </>
  );
};

export default PageContentModal;
