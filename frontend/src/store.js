import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  ProductDetailReducer,
  productsReducer,
} from "./reducers/productsReducer";
import { authReducer, userReducer } from "./reducers/usersReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

const reducer = {
  products: productsReducer,
  productDetail: ProductDetailReducer,
  auth: authReducer,
  user: userReducer,
};

const initialState = {};

const middleware = [thunk];

const store = configureStore({ reducer, initialState, middleware });

export default store;
