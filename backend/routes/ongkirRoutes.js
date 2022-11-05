const express = require("express");
const {
  getAllProvinces,
  getAllCities,
} = require("../controller/ongkirController");
const router = express.Router();

router.route("/provinsi").get(getAllProvinces);
router.route("/kota/:id").get(getAllCities);

module.exports = router;
