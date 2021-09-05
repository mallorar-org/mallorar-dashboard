const initialData = {
  // productID: "90383",
  productID: null,
  product_name: "",
  product_slug: "",
  status: "active",
  stock_count: 0,
  productImg: "", //** */
  brand: "",
  //
  product_department: "",
  product_category: "",
  child_category: "",
  //
  product_type: "general_product",
  product_condition: "new",
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
  product_in_country: "",
  product_in_city: "",
  //
  //local
  local_shipping_type: "free",
  local_handling_time: "3 business days",
  local_shipping_cost: 0.0,
  local_estimated_del_duration: "3-5 days",

  //int shipping
  intl_shipping_type: "no-shipping",
  intl_handling_time: "3 business days",
  intl_del_flat_fee: 0.0,
  intl_shipping_zones: [
    {
      index: 1,
      country: "South Africa",
      shipping_duration: "3-5 days",
      cost: 0.0,
    },
  ],

  stock_warehouses: "",

  tags: "",
  product_short_desc: [],
  product_long_description: "",
  desc_editor: "quill",
  product_variations: [],
  product_specifications: [],
  product_images: [
    {
      index: 1,
      product_url:
        "https://mallorar.imgix.net/Om_Bundle_New_33ceMI57845655.jpg?alt=media&height=130&q=60",
    },
    {
      index: 1,
      product_url:
        "https://mallorar.imgix.net/Om_Bundle_New_33ceMI57845655.jpg?alt=media&height=130&q=60",
    },
    {
      index: 1,
      product_url:
        "https://mallorar.imgix.net/Om_Bundle_New_33ceMI57845655.jpg?alt=media&height=130&q=60",
    },
    {
      index: 2,
      product_url:
        "https://mallorar.imgix.net/Om_Bundle_New_33ceMI57845655.jpg?alt=media&height=130&q=60",
    },
    {
      index: 3,
      product_url:
        "https://mallorar.imgix.net/Om_Bundle_New_33ceMI57845655.jpg?alt=media&height=130&q=60",
    },
  ],
};

const productReducer = (state = initialData, action) => {
  switch (action.type) {
    case "UPDATE_INTL_DEL_FLAT_FEE":
      return {
        ...state,
        intl_del_flat_fee: action.payload,
      };
    case "UPDATE_INTL_HANDLING_TIME":
      return {
        ...state,
        intl_handling_time: action.payload,
      };
    case "UPDATE_INTL_SHIPING_TYPE":
      return {
        ...state,
        intl_shipping_type: action.payload,
      };
    case "UPDATE_LOCAL_EST_SHIPPING_DUR":
      return {
        ...state,
        local_estimated_del_duration: action.payload,
      };
    case "UPDATE_LOCAL_SHIPPING_COST":
      return {
        ...state,
        local_shipping_cost: action.payload,
      };
    case "UPDATE_LOCAL_HANDLING_TIME":
      return {
        ...state,
        local_handling_time: action.payload,
      };
    case "UPDATE_LOCAL_SHIPPING_TYPE":
      if (action.payload === "free") {
        return {
          ...state,
          local_shipping_type: action.payload,
          local_shipping_cost: 0.0,
        };
      } else {
        return {
          ...state,
          local_shipping_type: action.payload,
        };
      }

    case "UPDATE_PRODUCT_COUNTRY":
      return {
        ...state,
        product_in_country: action.payload,
      };
    case "UPDATE_PRODUCT_CITY":
      return {
        ...state,
        product_in_city: action.payload,
      };
    case "UPDATE_PRODUCT_CONDITION":
      return {
        ...state,
        product_condition: action.payload,
      };
    case "UPDATE_PRODUCT_TYPE":
      return {
        ...state,
        product_type: action.payload,
      };
    case "UPDATE_PRODUCT_SALE_PRICE":
      return {
        ...state,
        sale_price: action.payload,
      };
    case "UPDATE_PRODUCT_ON_SALE":
      return {
        ...state,
        on_sale: action.payload,
      };
    case "UPDATE_PRODUCT_PRICE":
      return {
        ...state,
        product_price: action.payload,
      };
    case "UPDATE_BRAND":
      return {
        ...state,
        brand: action.payload,
      };
    case "UPDATE_BASE_CURRENCY":
      return {
        ...state,
        base_currency: action.payload,
      };
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
