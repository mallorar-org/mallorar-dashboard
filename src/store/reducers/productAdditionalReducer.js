const initialState = {
  selectedProducts: [],
  selected_images_in_selector: [],
  tobdeleted: null,
  productPage: {
    loading: true,
    qs: null,
    products: [],
  },
};

const productInitialReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "CLEAR_SELECTED_IMAGES_I_S":
      return {
        ...state,
        selected_images_in_selector: [],
      };
    case "SELECT_IMAGE_IN_SELECTOR":
      let selected_url = actions.payload;
      let current_selected_images = state.selected_images_in_selector;

      if (current_selected_images.indexOf(selected_url) === -1) {
        current_selected_images.push(selected_url);
      } else {
        let temp_selected = [];
        current_selected_images.forEach((x) => {
          if (x !== selected_url) {
            temp_selected.push(x);
          }
        });
        current_selected_images = temp_selected;
      }

      return {
        ...state,
        selected_images_in_selector: current_selected_images,
      };

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
