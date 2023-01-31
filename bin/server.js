"use strict";

const app = require("../src/app");
const debug = require("debug")("ApiNode:server");
const http = require("http");

const PORT = normalizePort(process.env.PORT || "3000");
app.set("port", PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);
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

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + addr.port;
  debug(`Listening on ${bind}`);
}
