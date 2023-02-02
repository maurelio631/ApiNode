const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");

mongoose.connect("mongodb://marco:mongoDev@localhost:27017/?authSource=admin");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
