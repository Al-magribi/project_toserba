const express = require("express");
const router = express.Router();
const {
  getProducts,
  productById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { authenticatedUser, authorizeRoles } = require("../middlewares/auth");

//Menambahkan produk baru => Admin
// Creating new product
router.route("/produk/admin/tambah").post(authenticatedUser, addNewProduct);

// Mengupdate product => Admin
// Updating new product
router.route("/produk/admin/update/:id").put(authenticatedUser, updateProduct);

// Menghapus produk => Admin
// Deleting product
router
  .route("/produk/admin/hapus/:id")
  .delete(authenticatedUser, deleteProduct);

// Menampilkan seluruh produk => Client
// Shoqwing all products
router.route("/produk").get(authorizeRoles("admin"), getProducts);

// Menampilkan produk bersadarkan id => Client
// Showing product based on its ID
router.route("/produk/:id").get(productById);

module.exports = router;
