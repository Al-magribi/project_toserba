const express = require("express");
const { proceedPayment } = require("../controller/PaymentController");
const router = express.Router();

router.route("/payment").get(proceedPayment);

module.exports = router;
