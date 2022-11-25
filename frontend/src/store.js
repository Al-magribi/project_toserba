import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  getOrdersReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
  orderUpDelReducer,
} from "./reducers/orderReducer";
import {
  createProductReducer,
  ProductDetailReducer,
  productReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productsReducer";
import {
  allUsersReducer,
  authReducer,
  forgotPassword,
  userDetailReducer,
  userReducer,
} from "./reducers/usersReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

const reducer = {
  products: productsReducer,
  productDetail: ProductDetailReducer,
  newProduct: createProductReducer,
  product: productReducer,
  auth: authReducer,
  user: userReducer,
  users: allUsersReducer,
  userDetail: userDetailReducer,
  forgotPassword: forgotPassword,
  cart: cartReducer,
  newOrder: orderReducer,
  myOrder: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderUpDelReducer,
  newReview: reviewReducer,
  allOrders: getOrdersReducer,
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
