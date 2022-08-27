const express = require("express");
const {
  getProducts,
  productById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const router = express.Router();

//Menambahkan produk baru => Admin
router.route("/produk/admin/tambah").post(addNewProduct);

// Mengupdate product => Admin
router.route("/produk/admin/update/:id").put(updateProduct);

// Menghapus produk => Admin
router.route("/produk/admin/hapus/:id").delete(deleteProduct);

// Menampilkan seluruh produk => Client
router.route("/produk").get(getProducts);

// Menampilkan produk bersadarkan id => Client
router.route("/produk/:id").get(productById);

module.exports = router;
