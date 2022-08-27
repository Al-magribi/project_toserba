require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const databaseConnection = require("./config/config");
const product = require("./routes/productRoutes");
const errorMiddleware = require("./middlewares/errors");
// const { errNotFound, errHandler } = require("./middlewares/errors");

databaseConnection();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(errNotFound);
// app.use(errHandler);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.use("/api/toserba", product);

app.listen(process.env.PORT, () => {
  console.log(
    `Server aktif di port ${process.env.PORT} dimode ${process.env.NODE_ENV}`
  );
});
