import axios from "axios";
import {
  ADMIN_ORDERS_FAIL,
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_NEW_ORDER_FAIL,
  CREATE_NEW_ORDER_REQUEST,
  CREATE_NEW_ORDER_SUCCESS,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDERS_FAIL,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_PAYMENT_FAIL,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "../constants/orderConstants";

// Get orders => Admin
export const getOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_ORDERS_REQUEST,
    });

    const { data } = await axios.get("/api/toserba/admin/orders");

    dispatch({
      type: ADMIN_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: ADMIN_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order => Admin
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ORDERS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/toserba/admin/order/update/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDERS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDERS_FAIL,
      error: error.response.data.message,
    });
  }
};

// Delete order => Admin
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ORDERS_REQUEST,
    });

    const { data } = await axios.delete(`/api/toserba/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDERS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

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

// Update payment
export const updatePayment = (id, statusData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PAYMENT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/toserba/payment/status/${id}`,
      statusData,
      config
    );

    dispatch({
      type: UPDATE_PAYMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAIL,
      error: error.response.data.message,
    });
  }
};
