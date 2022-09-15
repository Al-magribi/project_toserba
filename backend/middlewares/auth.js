const jwt = require("jsonwebtoken");
const User = require("../models/users");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchError = require("../middlewares/catchError");

exports.authenticatedUser = catchError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler("Silahkan login untuk mengakses halaman ini", 401)
    );
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(verified.id);

  next();
});
// Membatasi peran untuk mengakses halaman admin
exports.authorizeRoles = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
