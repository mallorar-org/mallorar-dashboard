import textToSlug from "../../util/textToSlug";

export const update_int_zone_shipping_duration = (dur, zindex) => {
  return {
    type: "UPDATE_INTL_ZONE_SHIPPING_DURATION",
    payload: { dur, zindex },
  };
};
export const update_int_zone_shipping_cost = (cost, zindex) => {
  return {
    type: "UPDATE_INTL_ZONE_SHIPPING_COST",
    payload: { cost, zindex },
  };
};
export const remove_shipping_zone = (index) => {
  return {
    type: "REMOVE_SHIPPING_ZONE",
    payload: index,
  };
};
export const add_intl_shipping_zone = (data) => {
  return {
    type: "ADD_INTL_SHIPPING_ZONE",
    payload: data,
  };
};
export const update_product_name = (name) => (dispatch) => {
  let slug = textToSlug(name);

  dispatch({
    type: "PP_UPDATE_PRODUCT_SLUG",
    payload: slug,
  });
  dispatch({
    type: "PP_UPDATE_PRODUCT_NAME",
    payload: name,
  });
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
