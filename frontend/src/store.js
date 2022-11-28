import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  getOrdersReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
  orderUpDelReducer,
  updatePaymentReducer,
} from "./reducers/orderReducer";
import {
  createProductReducer,
  getReviewsReducer,
  ProductDetailReducer,
  productReducer,
  productsReducer,
  reviewDeleteReducer,
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
  productReviews: getReviewsReducer,
  review: reviewDeleteReducer,
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
  allOrders: getOrdersReducer,
  newReview: reviewReducer,
  payment: updatePaymentReducer,
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
