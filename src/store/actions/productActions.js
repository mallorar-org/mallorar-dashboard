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
export const update_combination_cost = (value, index) => {
  return {
    type: "UPDATE_PRODUCT_COMBINATION_COST",
    payload: { value, index },
  };
};
export const update_stock_count = (value, index) => {
  return {
    type: "UPDATE_PRODUCT_STOCK_COUNT",
    payload: { value, index },
  };
};
