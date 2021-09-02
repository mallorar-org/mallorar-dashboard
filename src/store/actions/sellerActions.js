import {
  LOADING_SIGNIN,
  LOADING_SIGNIN_DONE,
  UNSET_META,
  SET_META,
  CLEAR_ERRORS,
  SET_AUTHENTICATED,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
} from "../contructors";
import axios from "axios";
import jwtDecode from "jwt-decode";
import store from "../store";
import { getStore } from "../../store/actions/actions";

export const loginSeller = (userCred, history) => (dispatch) => {
  dispatch({ type: LOADING_SIGNIN });
  // dispatch({ type: SET_AUTHENTICATED });
  dispatch({ type: CLEAR_ERRORS });

  //Send data to backend
  axios
    .post("/dash/login", userCred)
    .then((res) => {
      console.log(res.data);
      setAuthorizationHeader(res.data.token);
      const decodedToken = jwtDecode(res.data.token);
      dispatch({
        type: SET_META,
        payload: decodedToken,
      });
      // dispatch(getLoggedInUserData());
      dispatch({ type: CLEAR_ERRORS });

      dispatch({ type: SET_AUTHENTICATED });

      history.push(`/`);
      dispatch({ type: LOADING_SIGNIN_DONE });
      store.dispatch(getStore());
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: `${
          err.response.data.error ||
          err.response.data.password ||
          err.response.data.account
        }`,
      });
      dispatch({ type: LOADING_SIGNIN_DONE });
    });
};

// export const getLoggedInUserData = () => (dispatch) => {
//     axios.get(`/user`)
//         .then(res => {
//             console.log(res.data);
//             dispatch({
//                 type: SET_USER,
//                 payload: res.data
//             })
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

export const logOutSeller = () => (dispatch) => {
  localStorage.removeItem(`mdt`);
  delete axios.defaults.headers.common[`Authorization`];
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch({ type: UNSET_META });
  window.history.go("/login");
};

export const loadmeta = (meta) => (dispatch) => {
  let metadata = meta;
  // console.log("es", metadata)
  dispatch({
    type: SET_META,
    payload: metadata,
  });
};

const setAuthorizationHeader = (token) => {
  const MalloraT = `DashBearer ${token}`;
  localStorage.setItem(`mdt`, MalloraT);

  axios.defaults.headers.common["Authorization"] = MalloraT;
};

export const updateBusinessDocument = (link) => (dispatch) => {
  axios
    .post("/dash/updatebusinessdoc", { url: link })
    .then(() => {
      dispatch({ type: "UP_BUS_DOC_URL", payload: link });
      dispatch({
        type: "DASH_OVERLAY_ACTIVE",
        payload: false,
      });
      dispatch({
        type: "UPLOADING_DOC",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPLOADING_DOC",
        payload: false,
      });
      console.log(err);
    });
};
export const updateProofOfResidence = (link) => (dispatch) => {
  axios
    .post("/dash/updatepor", { url: link })
    .then(() => {
      dispatch({ type: "UP_POR_DOC_URL", payload: link });
      dispatch({
        type: "DASH_OVERLAY_ACTIVE",
        payload: false,
      });
      dispatch({
        type: "UPLOADING_DOC",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPLOADING_DOC",
        payload: false,
      });
      console.log(err);
    });
};

export const updateProofOfCitizenship = (link) => (dispatch) => {
  axios
    .post("/dash/updatepoc", { url: link })
    .then(() => {
      dispatch({ type: "UP_POC_DOC_URL", payload: link });
      dispatch({
        type: "DASH_OVERLAY_ACTIVE",
        payload: false,
      });
      dispatch({
        type: "UPLOADING_DOC",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPLOADING_DOC",
        payload: false,
      });
      console.log(err);
    });
};

export const uploadingdoc = (n) => {
  return {
    type: "UPLOADING_DOC",
    payload: n,
  };
};
