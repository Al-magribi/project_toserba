require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const databaseConnection = require("./config/config");
const product = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorMiddleware = require("./middlewares/errors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.use("/api/toserba", product);
app.use("/api/toserba", userRoutes);
app.use("/api/toserba", orderRoutes);

// Koneksi database
databaseConnection();

// error middleware harus diletakan dibawah routes
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(
    `Server aktif di port ${process.env.PORT} dimode ${process.env.NODE_ENV}`
  );
});
