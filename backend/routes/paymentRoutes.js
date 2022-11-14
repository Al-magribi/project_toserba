const express = require("express");
const {
  proceedPayment,
  midtransApi,
  getResponseTransaction,
  paymentResponse,
} = require("../controller/PaymentController");
const { authenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/transaction").post(authenticatedUser, proceedPayment);
router.route("/midtransapi").get(authenticatedUser, midtransApi);
router.route("/satus/:order_id").get(authenticatedUser, paymentResponse);

module.exports = router;
