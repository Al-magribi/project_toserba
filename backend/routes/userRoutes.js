const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} = require("../controller/userController");

// Registrasi User Baru => Client
router.route("/daftar").post(registerUser);
// Login user => Client
router.route("/login").post(loginUser);
// Reset Password
router.route("/reset").post(resetPassword);
//Logout user => Client & admin
router.route("/logout").get(logoutUser);

module.exports = router;
