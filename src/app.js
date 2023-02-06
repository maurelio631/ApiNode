const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

const mongoose = require("mongoose");
mongoose.connect("mongodb://marco:mongoDev@localhost:27017/?authSource=admin");
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");

const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
