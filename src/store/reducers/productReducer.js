const initialData = {
  // productID: "90383",
  productID: null,
  productName: "",
  productSlug: "",
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
  product_variations: [],
  product_specifications: [],
  product_images: [],
};

const productReducer = (state = initialData, action) => {
  switch (action.type) {
    case "CHANGE_SPEC_FIELD_VALUE":
      let newvalue = actions.payload;

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
      return { ...state, product_specifications: actions.payload };
    case "UPDATE_VARIATIONS":
      return { ...state, product_variations: actions.payload };
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
          childCategry: action.payload.toLowerCase().replace(/ /g, "-"),
        };
      } else {
        return {
          ...state,
          childCategry: "",
        };
      }

    case "SET_CAT":
      if (action.payload) {
        return {
          ...state,
          productCategory: action.payload.toLowerCase().replace(/ /g, "-"),
        };
      } else {
        return {
          ...state,
          productCategory: "",
        };
      }

    case "SET_DEP":
      if (action.payload) {
        return {
          ...state,
          productDepartment: action.payload.toLowerCase().replace(/ /g, "-"),
        };
      } else {
        return {
          ...state,
          productDepartment: "",
        };
      }

    case "UPDATE_PRODUCT_IMG":
      return { ...state, productImg: action.payload };
    case "UPDATE_PRODUCTS_IMGS":
      return {
        ...state,
        img1: action.payload.img1,
        img2: action.payload.img2,
        img3: action.payload.img3,
        img4: action.payload.img4,
      };
    case "UPDATE_BRAND":
      return { ...state, brand: action.payload };
    case "PRODUCT_TITLE":
      return {
        ...state,
        productName: action.payload.productName,
        productSlug: action.payload.productSlug,
      };
    case "PRODUCT_POINTS":
      return {
        ...state,
        productSD1: action.payload.productSD1,
        productSD2: action.payload.productSD2,
        productSD3: action.payload.productSD3,
        productSD4: action.payload.productSD4,
        productSD5: action.payload.productSD5,
      };

    case "PRODUCT_DESCRIPTION":
      return {
        ...state,
        productDescription: action.payload,
      };

    case "PRODUCT_DATA":
      if (action.payload.salePrice !== "" && action.payload.salePrice !== "0") {
        return {
          ...state,
          productType: action.payload.productType,
          sellingCurrency: action.payload.sellingCurrency,
          oldPrice: action.payload.productPrice,
          productPrice: action.payload.salePrice,
          shippingType: action.payload.shippingType,
          stockfrom: action.payload.stockfrom,
          esShippingDates: action.payload.esShippingDates,
          isDiscounted: "true",
        };
      } else
        return {
          ...state,
          productType: action.payload.productType,
          sellingCurrency: action.payload.sellingCurrency,
          productPrice: action.payload.productPrice,
          oldPrice: "0",
          shippingType: action.payload.shippingType,
          stockfrom: action.payload.stockfrom,
          esShippingDates: action.payload.esShippingDates,
          isDiscounted: "false",
        };

    case "RESET_PRODUCT_STATE":
      return { ...initialData };

    case "LOAD_PRODUCT_DETAILS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
