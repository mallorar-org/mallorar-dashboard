import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import DashBoard from "./containers/DashContainer";
import store from "./store/store";

import "normalize.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "./assets/css/main.css";
import "normalize.css";

const MallDashBoard = (
  <Provider store={store}>
    <BrowserRouter>
      <DashBoard />
    </BrowserRouter>
  </Provider>
);

// ReactDOM.render(<MLDashBoard />, document.getElementById('root'));
ReactDOM.render(MallDashBoard, document.getElementById("root"));
