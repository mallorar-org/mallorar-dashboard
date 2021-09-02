export const update_product_name = (name) => {
  return {
    type: "PP_UPDATE_PRODUCT_NAME",
    payload: name,
  };
};
export const update_product_variations = (v) => {
  return {
    type: "UPDATE_PRODUCT_VARIATIONS",
    payload: v,
  };
};
