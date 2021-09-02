const initialState = {
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

      let pd_new = {
        ...pd,
        products: actions.payload,
      };

      console.log({ pd_new });

      return {
        ...state,
        productPage: pd_new,
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

    case "SAVE_DE_PR":
      return { ...state, tobdeleted: actions.payload };

    default:
      return state;
  }
};

export default productInitialReducer;
