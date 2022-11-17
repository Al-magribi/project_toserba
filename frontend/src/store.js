import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";
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
  newOrder: orderReducer,
  myOrder: myOrdersReducer,
  orderDetails: orderDetailsReducer,
};

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
