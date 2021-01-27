const express = require("express");
const server = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const { notFoundHandler, errorLogger, errorHandler } = require("./middlewares");

require("dotenv").config({ path: __dirname + "/.env" });

// Middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

// Routes
server.use("/forecast", routes);

// Gestions d'erreurs serveur
server.use("*", notFoundHandler);
server.use(errorLogger);
server.use(errorHandler);

module.exports = server;
