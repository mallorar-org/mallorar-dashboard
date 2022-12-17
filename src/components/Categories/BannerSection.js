import React from "react";

export default function BannerSection() {
  return (
    <div className="mt-3">
      <div className="mb-3 p-3 border rounded">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <img
                alt=""
                className="img-fluid"
                src={
                  "https://i.ebayimg.com/thumbs/images/g/ZyUAAOSwE8xh1eXX/s-l960.webp"
                }
              />
            </div>
            <div className="col-6 border-left">
              <div className="border-bottom">
                <div className="d-flex justify-content-between align-items-center pb-2">
                  <h6 className="bold text-secondary mb-0">Banner content</h6>
                  <button className="ml-dash-btn py-1">Edit</button>
                </div>
              </div>
              <div className="py-2">
                <div className="border rounded p-2">
                  <div className="text-secondary">Banner text</div>
                  <div className="bold">Your Gym, Right at Home</div>
                  <div className="text-secondary">
                    Hit your fitness goals from the comfort of your home
                  </div>
                </div>
                <div className="mt-2 px-1">
                  <div className="d-flex mt-3 align-items-center">
                    <div className="bold">Background color</div>
                    <div className="text-small w-25 bg-gray p-3 ml-3"></div>
                  </div>
                  <div className="d-flex mt-2 align-items-center">
                    <div className="bold">Button color</div>
                    <div className="text-small w-25 bg-gray p-3 ml-3"></div>
                  </div>
                  <div className="d-flex mt-2 align-items-center">
                    <div>Button preview - </div>
                    <div>
                      <div className="ml-btn ml-2"> Start shopping</div>
                    </div>
                  </div>
                  <div className="d-flex mt-3 align-items-center">
                    <div className="text-small bg-gray p-2 px-3">
                      <div className="bold">Route click to</div>
                      https://m.martlyy.com/c/fashion/watches-parts-n-accessories
                    </div>
                  </div>
                  <div className="pt-3">
                    <span className="bold cp">Delete</span>
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
