const router = require("express").Router();

router.get("/", (request, response) => {
  response.status(200).json({ message: "je suis la page d'accueil" });
});

module.exports = router;
