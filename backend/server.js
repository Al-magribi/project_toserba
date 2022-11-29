require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const databaseConnection = require("./config/config");
const product = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const ongkirRoutes = require("./routes/ongkirRoutes");
const errorMiddleware = require("./middlewares/errors");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

// Koneksi database
databaseConnection();

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cookieParser());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.use("/api/toserba", product);
app.use("/api/toserba", userRoutes);
app.use("/api/toserba", orderRoutes);
app.use("/api/toserba", ongkirRoutes);
app.use("/api/toserba", paymentRoutes);

// konfigurasi cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}
// error middleware harus diletakan dibawah routes
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(
    `Server aktif di port ${process.env.PORT} dimode ${process.env.NODE_ENV}`
  );
});
