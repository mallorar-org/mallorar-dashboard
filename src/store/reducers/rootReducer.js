import { combineReducers } from "redux";
import AdminReducer from "./adminReducer";
import navTitles from "../reducers/navTitleReducer";
import LoadingUI from "../reducers/loadingUI";
import core from "../reducers/coreReducer";
import productReducer from "../reducers/productReducer";
import productAdditionalReducer from "../reducers/productAdditionalReducer";

const rootReducer = combineReducers({
  admin: AdminReducer,
  core: core,
  progress: LoadingUI,
  product: productReducer,
  productAR: productAdditionalReducer,
  navTitles,
});

export default rootReducer;
