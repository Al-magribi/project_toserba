const User = require("../models/users");
const catchError = require("../middlewares/catchError");
const ErrorHandler = require("../utilities/ErrorHandler");
const sendToken = require("../utilities/cookie");
const sendEmail = require("../utilities/sendEmail");

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

// Lupa password / Forgot password
exports.resetPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Email tidak terdaftar", 404));
  }

  //reset TOKEN
  const resetToken = user.ResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // url untuk reset password
  const urlReset = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;

  // Pesan email untuk reset password
  const message = `Klik link dibawah ini unutk mereset password anda:\n\n${urlReset}\n\nAbaikan 
    jika anda tidak mereset password`;

  // mengirim Email untuk reset password
  try {
    // jika bersahil mengirim email
    await sendEmail({
      email: user.email,
      subject: "toserba reset password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email berhasil dikirim ke ${user.email}`,
    });
  } catch (error) {
    // jika gagal merest password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
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
