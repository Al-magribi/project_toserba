import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic-with-icons";

const option = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transtition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...option}>
      <App />
    </AlertProvider>
  </Provider>
);
