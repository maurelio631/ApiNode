"use strict";

const http = require("http");
const debug = require("debug")("ApiNode:server");
const express = require("express");
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const router = express.Router();
const route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "API Node",
    version: "0.0.1",
  });
});

app.set("port", PORT);
app.use("/", route);

server.listen(PORT);

console.log(`Servidor rodando e ouvindo à porta ${PORT}`);
