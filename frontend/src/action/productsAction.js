import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERROR,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
} from "../constants/productsConstant";

// Action All products
export const getProducts = (
  keyword = "",
  currentPage = 1,
  harga,
  kategori,
  rating = 0
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    // API DATA Product dari backend
    let link = `/api/toserba/produk?keyword=${keyword}&page=${currentPage}&harga[lte]=${harga[1]}&harga[gte]=${harga[0]}&rating[gte]=${rating}`;

    if (kategori) {
      link = `/api/toserba/produk?keyword=${keyword}&page=${currentPage}&harga[lte]=${harga[1]}&harga[gte]=${harga[0]}&kategori=${kategori}&rating[gte]=${rating}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action Product detail
export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/toserba/produk/${id}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// New Review
export const createReview = (dataReview) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/toserba/review", dataReview, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.successs,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      error: error.response.data.message,
    });
  }
};

// Clear Error
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
