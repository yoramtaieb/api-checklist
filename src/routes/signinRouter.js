const signinRouter = require("express").Router();

signinRouter.get("/signin", (request, response) => {
  response.json({ message: "je suis la route signin" });
});

module.exports = signinRouter;
