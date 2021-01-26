require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routes");

// Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());

server.use(routes);

module.exports = server;
