const express = require("express");
const router = express.Router();
const {
  getProducts,
  productById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
} = require("../controller/productController");
const { authenticatedUser, authorizeRoles } = require("../middlewares/auth");

//Menambahkan produk baru => Admin
// Creating new product
router
  .route("/produk/admin/tambah")
  .post(authenticatedUser, authorizeRoles("admin"), addNewProduct);

// Mengupdate product => Admin
// Updating new product
router
  .route("/produk/admin/update/:id")
  .put(authenticatedUser, authorizeRoles("admin"), updateProduct);

// Menghapus produk => Admin
// Deleting product
router
  .route("/produk/admin/hapus/:id")
  .delete(authenticatedUser, authorizeRoles("admin"), deleteProduct);

// Menampilkan seluruh produk => Client
// Shoqwing all products
router.route("/produk").get(getProducts);

// Menampilkan produk bersadarkan id => Client
// Showing product based on its ID
router.route("/produk/:id").get(productById);
// Creating Reviews => client
router.route("/review").put(authenticatedUser, createReview);
// Delete Reviews => Client & admin
router.route("/reviews").delete(authenticatedUser, deleteReview);
// all reviews => admin
router.route("/reviews").get(authenticatedUser, getReviews);

module.exports = router;
