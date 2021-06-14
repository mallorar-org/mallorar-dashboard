import {
  SET_AUTHENTICATED,
  SET_ERRORS,
  LOADING_SIGNIN,
  UNSET_META,
  SET_META,
} from "../contructors";

const initialState = {
  authenticated: false, // set to false
  userCredentials: [],
  error: "",
  loading: false,
  meta: {
    claims: {
      fName: "Harmony",
      sName: "Chikari",
      verified: "true",
    },
  },
  notifier: {
    type: 1,
    head: "Success",
    image: "",
    message: "This operation was successful",
    open: false,
  },
};

const AdminReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_NOTIFY":
      return {
        ...state,
        notifier: actions.payload,
      };

    case "CLOSE_NOTIFY":
      return {
        ...state,
        notifier: {
          open: false,
          type: state.notifier.type,
          head: state.notifier.head,
          image: state.notifier.image,
          message: state.notifier.message,
        },
      };
    case UNSET_META:
      return {
        ...state,
        meta: {},
      };
    case SET_META:
      return {
        ...state,
        meta: actions.payload,
      };
    case LOADING_SIGNIN:
      return {
        ...state,
        loading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };

    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default AdminReducer;
