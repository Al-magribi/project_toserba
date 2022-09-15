const User = require("../models/users");
const catchError = require("../middlewares/catchError");
const ErrorHandler = require("../utilities/ErrorHandler");
const sendToken = require("../utilities/cookie");

exports.registerUser = catchError(async (req, res, next) => {
  const { nama, email, password } = req.body;

  const user = await User.create({
    nama,
    email,
    password,
    avatar: {
      public_id: "people/boy-snow-hoodie",
      url: "https://res.cloudinary.com/pt-edutech/image/upload/v1661959044/samples/people/boy-snow-hoodie.jpg",
    },
  });

  // JSON WEB TOKEN
  sendToken(user, 200, res);

  // const token = user.getJwtToken();

  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//Algoritma Login
exports.loginUser = catchError(async (req, res, next) => {
  const { email, password } = req.body;

  // Cek entri email dan password oleh user
  if (!email || !password) {
    return next(new ErrorHandler("Masukan Email dan Password", 400));
  }

  // Cek user di database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email tidak ditemukan", 401));
  }

  // Cek password di database
  const PasswordMatched = await user.comparePassword(password);

  if (!PasswordMatched) {
    return next(new ErrorHandler("Password salah", 401));
  }
  // jika password sesuai
  sendToken(user, 200, res);

  // const token = user.getJwtToken();

  // res.status(200).json({
  //   success: true,
  //   token,
  // });
});

// Logout User
exports.logoutUser = catchError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    htppOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Berhasil",
  });
});
