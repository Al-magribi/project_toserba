const ErrorHandler = require("../utilities/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};

// menampilkan status error jika URL salah
// const errNotFound = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// // menampilkan status error jika produk id tidak ditemukan
// const errHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stack: process.NODE_ENV === "PRODUCTION" ? null : err.stack,
//   });
// };

// module.exports = { errNotFound, errHandler };
