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
    name: "",
    slug: "",
    image: "",
  });

  const [selectorOpen, selectorState] = useState(false);

  useEffect(() => {
    setData({
      name: "",
      slug: "",
      image: "",
    });
  }, [opened]);

  const handleTextChange = (e) => {
    let slug = textToSlug(e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value,
      slug: slug,
    });
  };

  const handleCreate = () => {
    if (loading) return;
    if (!data.image) {
      return alert("Please select an image first");
    }
    if (!data.name) {
      return alert("Please name this " + label.toLowerCase());
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
                  image: img,
                });
              }}
              image={data.image}
            />
          </div>

          <div className="text-center mt-3">
            <p>
              Make sure the image is a perfect square or has dimensions of 1:1
            </p>
            <button onClick={() => selectorState(true)} className="btn ml-btn">
              Add/Replace Image
            </button>
          </div>

          <div>
            <div className="mb-2 text-secondary">{label} name</div>
            <input
              onChange={handleTextChange}
              type="text"
              className="w-100 form-control"
              placeholder=""
              name="name"
            />
            {data.slug ? (
              <>
                <div className="mt-3 pb-1 text-secondary">Slug : </div>
                <div className="px-2 py-1 border rounded">{data.slug}</div>
              </>
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
      <div className="border p-2 ml-banner-image-container tex-center d-flex">
        <img
          className="img-fluid"
          src={image ? image : PlaceHolderImage}
          alt=""
        />
      </div>
    </>
  );
};

export default PageContentModal;
