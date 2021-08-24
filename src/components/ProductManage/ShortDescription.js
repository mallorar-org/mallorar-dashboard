import React, { Component } from "react";
import { CgDetailsLess } from "react-icons/cg";
import { connect } from "react-redux";
import {
  short_desc_update,
  add_new_short_desc_field,
} from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    product_short_desc: state.product.product_short_desc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    short_desc_update: (index, value) =>
      dispatch(short_desc_update(index, value)),
    add_new_short_desc_field: () => dispatch(add_new_short_desc_field()),
  };
};

function ShortDescription({
  add_new_short_desc_field,
  short_desc_update,
  product_short_desc,
}) {
  const on_short_desc_change = (e) => {
    short_desc_update(parseInt(e.target.name), e.target.value);
  };

  console.log({ product_short_desc });
  return (
    <div className="mt-3 mr-2 card card-body ml-card-shadow">
      <h5 className="c-blue d-flex align-items-center border-bottom pb-2">
        <CgDetailsLess className="ml-icon-size2 mr-2" />
        <span className="bold c-blue">Short Details</span>
      </h5>

      {product_short_desc.map((x) => (
        <div key={x.id} className="mt-3 form-group">
          <div className="mt-2 row form-group">
            <div className="col col-md-1 d-flex align-items-center">{1}.</div>
            <div className="col-12 col-md-8">
              <input
                type="text"
                value={x.text}
                onChange={on_short_desc_change}
                name={x.id}
                placeholder="Type a short description.."
                className="form-control"
              />
            </div>
          </div>
        </div>
      ))}
      <div>
        <button
          type="button"
          onClick={add_new_short_desc_field}
          className="btn ml-btn"
        >
          Add new field
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortDescription);
