import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

const reducer = {
  products: productsReducer,
};

const initialState = {};

const middleware = [thunk];

const store = configureStore({ reducer, initialState, middleware });

export default store;
