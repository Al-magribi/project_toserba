import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  ProductDetailReducer,
  productsReducer,
} from "./reducers/productsReducer";
import {
  authReducer,
  forgotPassword,
  userReducer,
} from "./reducers/usersReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

const reducer = {
  products: productsReducer,
  productDetail: ProductDetailReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPassword,
  cart: cartReducer,
};

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = configureStore({ reducer, initialState, middleware });

export default store;
