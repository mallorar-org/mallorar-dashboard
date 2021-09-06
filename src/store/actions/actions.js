import axios from "axios";
import store from "../store";
import { notify, close } from "../../components/MLNotify/controls";
import { validateProduct } from "../../util/validateProductObj";

export const remove_photo = (index) => {
  return {
    type: "REMOVE_PRODUCT_PHOTO",
    payload: index,
  };
};
export const remove_short_desc = (id) => {
  return {
    type: "REMOVE_SHORT_DESC_FIELD",
    payload: id,
  };
};

export const add_new_short_desc_field = () => (dispatch) => {
  dispatch({
    type: "ADD_NEW_SHORT_DESC_FIELD",
  });

  if (store.getState().product.product_short_desc.length > 0) {
    dispatch({
      type: "SHORT_DESC_UPDATE",
      payload: {
        index: 1,
        value: store.getState().product.product_short_desc[0].value,
      },
    });
  }
};

export const short_desc_update = (index, value) => (dispatch) => {
  dispatch({
    type: "SHORT_DESC_UPDATE",
    payload: { index, value },
  });
};

export const setLoadingBarProgress = (value) => ({
  type: "SET_PROGRESS",
  payload: value,
});

export const updatetotalproducts = () => ({
  type: "UPDATE_TOTAL_PRODUCTS_AA",
});

export const getStore = () => (dispatch) => {
  dispatch({
    type: "SET_PROGRESS",
    payload: 0,
  });

  dispatch({
    type: "SET_PROGRESS",
    payload: 57,
  });
  axios
    .get("/dash/store")
    .then((data) => {
      dispatch({
        type: "UPDATE_PRODUCT_COUNTRY",
        payload: data.data.baseCountry,
      });
      dispatch({
        type: "UPDATE_PRODUCT_CITY",
        payload: data.data.storeData.city,
      });
      dispatch({
        type: "GET_STORE_DEFAULTS",
        payload: data.data,
      });
      dispatch({
        type: "SET_PROGRESS",
        payload: 100,
      });
      dispatch({ type: "DASH_READY" });
      // console.log(data.data);
    })
    .catch((err) => {
      // console.log(err);
    });
};

export const dashoverlay = (n) => (dispatch) => {
  dispatch({
    type: "DASH_OVERLAY_ACTIVE",
    payload: n,
  });
};

export const createProduct = () => (dispatch) => {
  let product = store.getState().product;

  let errors = validateProduct(product);

  if (errors) {
    return notify(...errors);
  }

  let finalProduct = {};

  finalProduct = {
    ...product,
    productImg: product.product_images[0].product_url,
  };

  close();

  store.dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: true });

  console.log({ finalProduct });

  let productID;
  axios
    .post(`/dash/product/add`, {
      productData: finalProduct,
    })
    .then((data) => {
      store.dispatch({
        type: "SET_PRODUCT_ID",
        payload: data.data.productID,
      });

      productID = data.data.productID;
    })
    .then(() => {
      store.dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
      store.dispatch({ type: "MLPC", payload: true });
      return notify(
        1,
        `Product Created`,
        finalProduct.productImg,
        `Product successfully created with ID ${productID}. Your product will be spread around Mallorar immediately`,
      );
    })
    .catch((err) => {
      // console.log(err);
    });
};

export const setProductID = (id) => (dispatch) => {
  dispatch({
    type: "SET_PRODUCT_ID",
    payload: id,
  });
};

export const productModalControl = (n) => (dispatch) => {
  dispatch({ type: "MLPC", payload: n });
};
export const createNewProduct = () => (dispatch) => {
  dispatch({ type: "RESET_PRODUCT_STATE" });
  dispatch({ type: "MLPC", payload: false });
};
export const editProduct =
  (n = store.getState().product.productID) =>
  (dispatch) => {
    dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: true });
    dispatch({ type: "MLPC", payload: false });

    let pid;

    if (!pid) {
      pid = n;
    }

    if (pid === null) {
      dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
      return notify(
        3,
        `Operation halted`,
        "",
        `Unfortunately this product does not exist as yet, try reselecting a product to edit.`,
      );
    }

    dispatch({ type: "RESET_PRODUCT_STATE" });
    axios
      .get(`/dash/product/${pid}/get`)
      .then((e) => {
        let product = {};
        product = {
          ...e.data,
        };
        // console.log("+++=>>>>", e.data);
        dispatch({
          type: "LOAD_PRODUCT_DETAILS",
          payload: product,
        });
        dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
      })
      .catch(() => {
        dispatch({ type: "RESET_PRODUCT_STATE" });
        dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
        return notify(
          3,
          `Product not found`,
          "",
          `The product you just tried to edit does not exist in your store, try to create a new product or go back and select the correct product from the product list`,
        );
      });
  };

export const addToSelectedPDList = (id) => (dispatch) => {};

export const deleteProduct = (pid) => (dispatch) => {
  dispatch({ type: "SAVE_DE_PR", payload: pid });
  dispatch({ type: "PD_DEL-CONF", payload: true });
};

export const deleteSelectedProducts = () => (dispatch) => {
  let selectedProducts = store.getState().productAR.selectedProducts;

  dispatch({ type: "PD_DEL-CONF", payload: false });
  dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: true });

  selectedProducts.forEach((tobdeleted, index) => {
    return axios
      .get(`/dash/product/delete/${tobdeleted}`)
      .then(() => {
        if (index === selectedProducts.length - 1) {
          dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
        }
        let currentProducts = store.getState().productAR.productPage.products;

        let newlist = [];

        currentProducts.forEach((x) => {
          if (x.PID !== tobdeleted) {
            newlist.push(x);
          }
        });

        dispatch({
          type: "SUBT_TOTAL_PRODUCTS",
        });
        dispatch({
          type: "UPDATE_PRODUCTS_SELLER_PRODUCTS",
          payload: newlist,
        });

        console.log("updated==>", newlist);

        return notify(
          1,
          `Product deleted`,
          "",
          `The product with ID ${tobdeleted} has been removed from Mallorar Online Mall`,
        );
      })
      .catch(() => {
        dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
        return notify(
          2,
          `Operation failed`,
          "",
          `This is probably because the product with ID ${tobdeleted} has already been deleted. Try refeshing page`,
        );
      });
  });
};

export const confirmDeletion = () => (dispatch) => {
  let tobdeleted = store.getState().productAR.tobdeleted;
  dispatch({ type: "PD_DEL-CONF", payload: false });
  dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: true });

  if (!tobdeleted) {
    dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
    return notify(
      3,
      `Operation halted`,
      "",
      `We encountered an un-usual error, please try deleting this product again or contact support if the problem persists`,
    );
  }

  axios
    .get(`/dash/product/delete/${tobdeleted}`)
    .then(() => {
      dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
      let currentProducts = store.getState().productAR.productPage.products;

      let newlist = [];

      currentProducts.forEach((x) => {
        if (x.PID !== tobdeleted) {
          newlist.push(x);
        }
      });

      dispatch({
        type: "SUBT_TOTAL_PRODUCTS",
      });
      dispatch({
        type: "UPDATE_PRODUCTS_SELLER_PRODUCTS",
        payload: newlist,
      });

      console.log("updated==>", newlist);

      return notify(
        1,
        `Product deleted`,
        "",
        `The product with ID ${tobdeleted} has been removed from Mallorar Online Mall`,
      );
    })
    .catch(() => {
      dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
      return notify(
        2,
        `Operation failed`,
        "",
        `This is probably because the product with ID ${tobdeleted} has already been deleted. Try refeshing page`,
      );
    });
};

export const getProducts =
  (qs = null) =>
  (dispatch) => {
    if (store.getState().productAR.productPage.products.length > 0) {
      dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: true });
    }
    axios
      .get(`/dash/products?${qs}`)
      .then((res) => {
        console.log({ res });
        dispatch({ type: "DASH_OVERLAY_ACTIVE", payload: false });
        dispatch({
          type: "LOAD_SELLER_PRODUCTS",
          payload: res.data,
        });
      })
      .catch((err) => {
        // console.log(err);
        // store.dispatch(logOutSeller());
      });
  };
