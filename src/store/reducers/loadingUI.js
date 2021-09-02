import { LOADING_SIGNIN, LOADING_SIGNIN_DONE } from "../contructors";

const initialState = {
  loggingInLoader: false,
  progress: 0,
  dashOverLay: false,
  uploading_doc: false,
  dashready: false, //change to false on production s
  productcsmodal: false,
  productdelconfmodal: false,
};

const LoadingUi = (state = initialState, action) => {
  switch (action.type) {
    case "PD_DEL-CONF":
      return { ...state, productdelconfmodal: action.payload };
    case "CLOSE_DEL_CONF_MODAL":
      return { ...state, productdelconfmodal: false };
    case "MLPC":
      return { ...state, productcsmodal: action.payload };
    case "DASH_READY":
      return { ...state, dashready: true };
    case "UPLOADING_DOC":
      return { ...state, uploading_doc: action.payload };
    case "DASH_OVERLAY_ACTIVE":
      return { ...state, dashOverLay: action.payload };
    case "SET_PROGRESS":
      //   state.progress = action.payload;
      return { ...state, progress: action.payload };
    case LOADING_SIGNIN:
      return { ...state, loggingInLoader: true };
    case LOADING_SIGNIN_DONE:
      return { ...state, loggingInLoader: false };

    default:
      return state;
  }
};

export default LoadingUi;
