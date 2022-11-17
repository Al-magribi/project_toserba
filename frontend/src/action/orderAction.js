import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_NEW_ORDER_FAIL,
  CREATE_NEW_ORDER_REQUEST,
  CREATE_NEW_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

// Create New order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NEW_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/toserba/pesanan/baru",
      order,
      config
    );

    dispatch({
      type: CREATE_NEW_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_ORDERS_REQUEST,
    });

    const { data } = await axios.get("/api/toserba/orders/me");
    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/toserba/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
