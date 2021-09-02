import React from "react";
import icons from "./icons";

export default function CheckBox({
  id,
  checked,
  label = undefined,
  onchange = undefined,
  children,
}) {
  return (
    <>
      <input
        type="checkbox"
        name="brandLabel"
        onChange={onchange}
        checked={checked}
        id={id}
        className="d-none"
      />
      <label
        htmlFor={id}
        className="ml-checkbox my-0 d-flex align-items-center"
      >
        <img
          src={icons.solid.tick.white}
          alt="checkbox"
          className="img-fluid"
        />
      </label>
    </>
  );
}
