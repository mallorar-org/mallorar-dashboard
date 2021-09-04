const initialData = {
  // productID: "90383",
  productID: null,
  product_name: "",
  product_slug: "",
  status: "active",
  stock_count: 0,
  productImg: "",
  brand: "",
  //
  product_department: "",
  product_category: "",
  child_category: "",
  //
  product_type: "general_product",
  product_state: "new",
  //
  product_price: 0.0,
  sale_price: 0.0,
  //
  base_currency: "USD",
  items_per_order: 5,
  //
  is_featured: false,
  on_sale: false,
  featured_expiration: "",
  //
  shipping_type: "free",
  shipping_costs: [],
  stock_warehouses: [],
  earliest_shipping_duration: 2,
  latest_shipping_duration: 5,
  //
  tags: "",
  product_short_desc: [],
  product_long_description: "",
  desc_editor: "quill",
  product_variations: [],
  product_specifications: [],
  product_images: [],
};

const productReducer = (state = initialData, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT_STOCK_COUNT":
      let updated_st_product_variations = [];
      state.product_variations.forEach((x) => {
        if (x.variation_index === action.payload.index) {
          updated_st_product_variations.push({
            ...x,
            stock_count: action.payload.value,
          });
        } else {
          updated_st_product_variations.push({
            ...x,
          });
        }
      });

      return {
        ...state,
        product_variations: updated_st_product_variations,
      };
    case "UPDATE_PRODUCT_COMBINATION_COST":
      let updated_product_variations = [];
      state.product_variations.forEach((x) => {
        if (x.variation_index === action.payload.index) {
          updated_product_variations.push({
            ...x,
            variations_cost: action.payload.value,
          });
        } else {
          updated_product_variations.push({
            ...x,
          });
        }
      });

      return {
        ...state,
        product_variations: updated_product_variations,
      };
    case "UPDATE_PRODUCT_VARIATIONS":
      return {
        ...state,
        product_variations: action.payload,
      };
    case "PP_UPDATE_PRODUCT_NAME":
      return {
        ...state,
        product_name: action.payload,
      };
    case "PRODUCT_DESCRIPTION":
      return {
        ...state,
        product_long_description: action.payload,
      };

    case "CHANGE_SPEC_FIELD_VALUE":
      let newvalue = action.payload;

      let curS = state.product_specifications;
      let newSpecs = [];

      curS.forEach((x) => {
        if (newvalue.sname !== x.sname) {
          newSpecs.push(x);
        } else {
          newSpecs.push(newvalue);
        }
      });

      //   newSpecs.push(newvalue);

      return { ...state, product_specifications: newSpecs };
    case "SET_SPECS_FIELDS":
      return { ...state, product_specifications: action.payload };
    case "UPDATE_VARIATIONS":
      return { ...state, product_variations: action.payload };
    case "REMOVE_SHORT_DESC_FIELD":
      let filtered_short_desc_field = [];

      state.product_short_desc.forEach((x) => {
        if (x.id !== parseInt(action.payload)) {
          filtered_short_desc_field.push(x);
        }
      });

      return {
        ...state,
        product_short_desc: filtered_short_desc_field,
      };
    case "ADD_NEW_SHORT_DESC_FIELD":
      let current_short_desc_list = state.product_short_desc;
      let c_sd_highest = 0;

      current_short_desc_list.forEach((x) => {
        if (x.id > c_sd_highest) {
          c_sd_highest = x.id;
        }
      });

      current_short_desc_list.push({
        id: c_sd_highest + 1,
        text: "",
      });

      return {
        ...state,
        product_short_desc: current_short_desc_list,
      };

    case "SHORT_DESC_UPDATE":
      let product_short_desc = state.product_short_desc;
      let updated_product_short_desc = [];

      product_short_desc.forEach((x) => {
        if (action.payload.index === x.id) {
          updated_product_short_desc.push({
            id: x.id,
            text: action.payload.value,
          });
        } else {
          updated_product_short_desc.push(x);
        }
      });

      return { ...state, product_short_desc: updated_product_short_desc };
    case "SET_PRODUCT_ID":
      return { ...state, productID: action.payload };
    case "SET_SUB_CAT":
      if (action.payload) {
        return {
          ...state,
          child_category: action.payload.toLowerCase().replace(/ /g, "-"),
        };
      } else {
        return {
          ...state,
          child_category: "",
        };
      }

    case "SET_CAT":
      if (action.payload) {
        return {
          ...state,
          product_category: action.payload.toLowerCase().replace(/ /g, "-"),
        };
      } else {
        return {
          ...state,
          product_category: "",
        };
      }

    case "SET_DEP":
      if (action.payload) {
        return {
          ...state,
          product_department: action.payload.toLowerCase().replace(/ /g, "-"),
        };
      } else {
        return {
          ...state,
          productproduct_departmentDepartment: "",
        };
      }

    case "RESET_PRODUCT_STATE":
      return { ...initialData };

    default:
      return state;
  }
};

export default productReducer;
