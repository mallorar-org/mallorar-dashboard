const initialState = {
  variations: [],
  specifications: [],
  selectedProducts: [],
  tobdeleted: null,
  productPage: {
    loading: true,
    qs: null,
    products: [],
  },
};

const productInitialReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "UPDATE_PRODUCTS_SELLER_PRODUCTS":
      let pd = state.productPage;
      pd = { ...pd, products: actions.payload };
      return {
        ...state,
        productPage: pd,
        selectedProducts: [],
      };
    case "LOAD_SELLER_PRODUCTS":
      return {
        ...state,
        productPage: actions.payload,
      };

    case "UPDATE_SELECTED_PDS":
      return {
        ...state,
        selectedProducts: actions.payload,
      };
    case "UPDATE_VARIATIONS":
      return { ...state, variations: actions.payload };
    case "SAVE_DE_PR":
      return { ...state, tobdeleted: actions.payload };
    case "SET_SPECS_FIELDS":
      return { ...state, specifications: actions.payload };

    case "CHANGE_SPEC_FIELD_VALUE":
      let newvalue = actions.payload;

      let curS = state.specifications;
      let newSpecs = [];

      curS.forEach((x) => {
        if (newvalue.sname !== x.sname) {
          newSpecs.push(x);
        } else {
          newSpecs.push(newvalue);
        }
      });

      //   newSpecs.push(newvalue);

      return { ...state, specifications: newSpecs };

    default:
      return state;
  }
};

export default productInitialReducer;
