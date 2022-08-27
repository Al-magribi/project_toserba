const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Masukan nama produk"],
  },
  harga: {
    type: Number,
    required: [true, "Masukan harga produk"],
    default: 0,
  },
  deskripsi: {
    type: String,
    required: [true, "Masukan deskirpsi produk"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  gambar: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],
  kategori: {
    type: String,
    required: [true, "Pilih kategori produk"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
    },
  },
  penjual: {
    type: String,
    required: [true, "Masukan penjual produk"],
  },
  stok: {
    type: Number,
    required: [true, "Masukan stok produk"],
    default: 0,
  },
  jmlReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      nama: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  dibuat: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
