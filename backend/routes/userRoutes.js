const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

// Registrasi User Baru => Client
router.route("/daftar").post(registerUser);
// Login user => Client
router.route("/login").post(loginUser);
// Forgot Password
router.route("/forgot").post(forgotPassword);
// Reset Password
router.route("/reset/:token").put(resetPassword);
//Logout user => Client & admin
router.route("/logout").get(logoutUser);

module.exports = router;
