import {
  ADMIN_ORDERS_FAIL,
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  UPDATE_ORDERS_FAIL,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_RESET,
  UPDATE_ORDERS_SUCCESS,
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

// Get All Order
export const getOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalHarga,
      };

    case ADMIN_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

// Update & Delete Order
export const orderUpDelReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_ORDERS_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create new Order
export const orderReducer = (state = {}, action) => {
  switch (action.payload) {
    case CREATE_NEW_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NEW_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREATE_NEW_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// get My ordes
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Order Details
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
