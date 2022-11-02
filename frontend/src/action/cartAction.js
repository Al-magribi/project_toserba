import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstant";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  // mencari id produk
  const { data } = await axios.get(`/api/toserba/produk/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.nama,
      price: data.product.harga,
      image: data.product.gambar[0].url,
      stock: data.product.stok,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
