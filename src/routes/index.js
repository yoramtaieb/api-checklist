const router = require("express").Router();
const { OK } = require("../helpers/status_code");
require("express-async-errors");

const userRouter = require("./userRouter");

router.get("/", (request, response) => {
  response.status(OK).json({ message: "je suis la page d'accueil" });
});

router.use(userRouter);

module.exports = router;
