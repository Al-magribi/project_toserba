const express = require("express");
const {
  proceedPayment,
  midtransApi,
  getResponseTransaction,
} = require("../controller/PaymentController");
const { authenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/payment").get(authenticatedUser, proceedPayment);
router.route("/midtransapi").get(authenticatedUser, midtransApi);
router
  .route("/status/:order_id")
  .get(authenticatedUser, getResponseTransaction);

module.exports = router;
