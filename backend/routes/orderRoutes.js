const express = require("express");
const {
  newOrder,
  singlerOrder,
  myOrders,
  getOrders,
  deleteOrder,
  updateOrder,
} = require("../controller/orderController");
const { authenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

// membuat pesanan baru / creating new order
router.route("/pesanan/baru").post(authenticatedUser, newOrder);
// detail order
router.route("/order/:id").get(authenticatedUser, singlerOrder);
// pesanan saya / my orders
router.route("/orders/me").get(authenticatedUser, myOrders);
// all orders => admin
router
  .route("/admin/orders")
  .get(authenticatedUser, authorizeRoles("admin"), getOrders);
// delete order => admin
router
  .route("/admin/order/:id")
  .delete(authenticatedUser, authorizeRoles("admin"), deleteOrder);
// Update order processing to delivered
router
  .route("/admin/order/:id")
  .put(authenticatedUser, authorizeRoles("admin"), updateOrder);

module.exports = router;
