const router = require("express").Router();
const { OK } = require("../helpers/status_code");
require("express-async-errors");

const signupRouter = require("./signupRouter");
const signinRouter = require("./signinRouter");

router.get("/", (request, response) => {
  response.status(OK).json({ message: "je suis la page d'accueil" });
});

router.use(signupRouter);
router.use(signinRouter);

module.exports = router;
