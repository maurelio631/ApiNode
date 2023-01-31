"use strict";

const http = require("http");
const debug = require("debug")("ApiNode:server");
const express = require("express");
const app = express();
const PORT = normalizePort(process.env.PORT || "3000");
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
server.on("error", onError);

console.log(`Servidor rodando e ouvindo à porta ${PORT}`);

function normalizePort(val) {
  const port = parseInt(val);

  if (isNaN) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe" + PORT : "Port" + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case "EADORINUSE":
      console.error(bind + "is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
