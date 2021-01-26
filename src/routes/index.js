const express = require("express");
const router = express.Router();
require("express-async-errors");

router.get("/", (request, response) => {
  response.status(200).json({ message: "je suis la page d'accueil" });
});

module.exports = router;
