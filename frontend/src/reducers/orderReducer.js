import {
  CLEAR_ERRORS,
  CREATE_NEW_ORDER_FAIL,
  CREATE_NEW_ORDER_REQUEST,
  CREATE_NEW_ORDER_SUCCESS,
} from "../constants/orderConstants";

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
