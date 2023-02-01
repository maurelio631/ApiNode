"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "NodeApi",
    version: "0.0.1",
  });
});

module.exports = router;
