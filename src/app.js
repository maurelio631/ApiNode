const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "API Node",
    version: "0.0.2",
  });
});

const create = router.post("/", (req, res, next) => {
  res.status(201).send(req.body);
});

const put = router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).send({ id: id, product: req.body });
});

const del = router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).send(req.body);
});

app.use("/", route);
app.use("/products", create);
app.use("/products", put);
app.use("/products", del);

module.exports = app;
