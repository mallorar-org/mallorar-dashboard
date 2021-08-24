const initialData = {
  // productID: "90383",
  productID: null,
  productName: "",
  productSlug: "",
  status: "active",
  dateCreated: new Date().toISOString(),
  productStock: "available",
  inStock: "0",
  productImg: "default",
  rating: "0",
  totalSales: "0",
  productDepartment: "",
  productCategory: "",
  childCategry: "",
  productType: "new-product",
  sellingCurrency: "US$",
  productPrice: "",
  isDiscounted: "",
  isFeatured: "false",
  orderMax: "5",
  brand: "",
  todaysSales: "0",
  onSale: "false",
  onSpecial: "false",
  shippingType: "calculated",
  stockfrom: "",
  oldPrice: "",
  sellerName: "",
  sellerID: "",
  sellerSlug: "",
  esShippingDates: "",
  tags: "",
  product_short_desc: [
    // {
    //   id: 1,
    //   text: "this is the desc",
    // },
  ],
  productSD1: "",
  productSD2: "",
  productSD3: "",
  productSD4: "",
  productSD5: "",
  productDescription: "",
  img1: "default",
  img2: "default",
  img3: "default",
  img4: "default",
};

const productReducer = (state = initialData, action) => {
  switch (action.type) {
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
      return initialData;
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
